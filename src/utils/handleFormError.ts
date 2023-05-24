import { FirebaseError } from 'firebase/app';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { unknownErrorToast } from 'utils/Toasts/unknownErrorToast';

type FormFirebaseErrors<FormData extends FieldValues> = Record<
  string,
  {
    type: Path<FormData>;
    message: string;
  }
>;

export async function handleFormError<FormData extends FieldValues>(
  catchErr: unknown,
  setError: UseFormSetError<FormData>,
  errors: FormFirebaseErrors<FormData>
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
