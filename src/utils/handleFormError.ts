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

/**
 * A function that displays a error message based on the error
 *
 * @param catchErr the error from the catch block
 * @param setError setError from react hook form
 * @param errors An object that contains named erros
 *
 * @example
 * ```
 * try {
 *  ...
 * } catch (err) {
 *   await handleFormError<FormData>(err, setError, {
      'auth/user-not-found': { // name/code of the error 
        type: 'email', // the input where the error will appear
        message: 'Este usuário não existe' // error message,
      },
    });
 * }
 * ```
 */

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
