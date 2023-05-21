import { FirebaseError } from 'firebase/app';
import { UseFormReturn } from 'react-hook-form';
import { unknownErrorToast } from 'utils/Toasts/unknownErrorToast';

type FormFirebaseErrors<FormData> = Record<
  string,
  {
    type: keyof FormData;
    message: string;
  }
>;

export async function handleFormError<FormData extends Record<string, string>>(
  catchErr: unknown,
  errors: FormFirebaseErrors<FormData>,
  setError: UseFormReturn['setError']
) {
  if (!(catchErr instanceof FirebaseError)) return unknownErrorToast();

  const error = errors[catchErr.code];

  if (!error) {
    const { unknownErrorToast } = await import(
      'utils/Toasts/unknownErrorToast'
    );
    unknownErrorToast();
  } else {
    setError(error.type, {
      message: error.message,
    });
  }
}
