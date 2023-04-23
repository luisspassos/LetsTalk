import { DangerousActionButtons } from 'components/Modal/DangerousAction/DangerousActionButtons';
import { signInWithEmailAndPassword, useAuth } from 'contexts/AuthContext';
import { useDeleteAccountModal } from 'contexts/Modal/DeleteAccountModalContext';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IsSubmitting } from 'utils/types';

export type PasswordFormData = {
  password: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: 'password';
    message: string;
  }
>;

type FirebaseErrorWithoutForm = Record<string, () => void>;

type Form = UseFormReturn<PasswordFormData>;
type FormProps = Pick<Form, 'handleSubmit' | 'setError'>;

type ButtonsProps = { isSubmitting: IsSubmitting } & FormProps;

async function unknownError() {
  const { unknownErrorToast } = await import('utils/Toasts/unknownErrorToast');

  unknownErrorToast();
}

export function Buttons({
  handleSubmit,
  setError,
  isSubmitting,
}: ButtonsProps) {
  const { user, isLoggedInWithGoogle } = useAuth();
  const { onClose } = useDeleteAccountModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // cleanup
    return () => {
      setIsLoading(false);
    };
  }, []);

  const deleteAccount = useMemo(
    () => ({
      constructor: async () => {
        const { auth } = await import('services/firebase');

        const currentUser = auth.currentUser;

        if (currentUser === null) return;

        const { deleteUser } = await import('firebase/auth');

        await deleteUser(currentUser);

        if (user?.displayName === null || user === null) return;

        const [
          { db, storage },
          { doc, deleteDoc },
          { ref },
          { checkIfFileExistsInStorage },
        ] = await Promise.all([
          import('services/firebase'),
          import('firebase/firestore'),
          import('firebase/storage'),
          import('utils/checkIfTheFileExistsInStorage'),
        ]);

        const userRef = doc(db, 'users', user.displayName);

        const userProfileAvatarPath = `usersProfileAvatar/${user.displayName}`;
        const userProfileAvatarRef = ref(storage, userProfileAvatarPath);

        const [avatarExists] = await Promise.all([
          checkIfFileExistsInStorage(userProfileAvatarPath),
          deleteDoc(userRef),
        ]);

        const { deleteObject } = await import('firebase/storage');

        if (avatarExists) {
          await deleteObject(userProfileAvatarRef);
        }

        onClose();
      },
      get userLoggedInWithGoogle() {
        return async () => {
          try {
            setIsLoading(true);
            await this.constructor();
          } catch (err) {
            const { FirebaseError } = await import('firebase/app');

            if (!(err instanceof FirebaseError)) return unknownError();

            const { reauthenticationToasts } = await import(
              'utils/Toasts/reauthenticationToasts'
            );

            const errors: FirebaseErrorWithoutForm = {
              'auth/requires-recent-login': reauthenticationToasts.error,
            };

            const error = errors[err.code];

            if (!error) {
              unknownError();

              return;
            }

            error();
          } finally {
            setIsLoading(false);
          }
        };
      },
      get userLoggedInWithPassword() {
        return handleSubmit(async ({ password }) => {
          try {
            if (!user?.email) return;

            await signInWithEmailAndPassword({
              email: user.email,
              password,
            });

            await this.constructor();
          } catch (err) {
            const { FirebaseError } = await import('firebase/app');

            if (!(err instanceof FirebaseError)) return unknownError();

            const errors: FormFirebaseError = {
              'auth/wrong-password': {
                type: 'password',
                message: 'Senha incorreta',
              },
            };

            const error = errors[err.code];

            if (!error) {
              unknownError();
            } else {
              setError(error.type, {
                message: error.message,
              });
            }
          }
        });
      },
    }),
    [handleSubmit, onClose, setError, user]
  );

  const action = isLoggedInWithGoogle
    ? deleteAccount.userLoggedInWithGoogle
    : deleteAccount.userLoggedInWithPassword;

  const loading = isLoggedInWithGoogle ? isLoading : isSubmitting;

  return (
    <DangerousActionButtons
      cancelButtonProps={{
        onClick: onClose,
      }}
      confirmButtonProps={{
        isLoading: loading,
        onClick: action,
      }}
      confirmButtonText='Deletar'
    />
  );
}
