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
        const { deleteUser } = await import('firebase/auth');
        const { auth, storage, db } = await import('services/firebase');
        const { doc, deleteDoc } = await import('firebase/firestore');
        const { ref, deleteObject } = await import('firebase/storage');
        const { checkIfFileExistsInStorage } = await import(
          'utils/checkIfTheFileExistsInStorage'
        );

        const currentUser = auth.currentUser;

        if (!currentUser || !user?.displayName) return;

        deleteUser(currentUser);

        const userRef = doc(db, 'users', user.displayName);

        deleteDoc(userRef);

        const userProfileAvatarPath = `usersProfileAvatar/${user.displayName}`;

        const userProfileAvatarRef = ref(storage, userProfileAvatarPath);

        const avatarExists = await checkIfFileExistsInStorage(
          userProfileAvatarPath
        );

        if (avatarExists) {
          deleteObject(userProfileAvatarRef);
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

            if (err instanceof FirebaseError) {
              const { reauthenticationToasts } = await import(
                'utils/Toasts/reauthenticationToasts'
              );

              const errors: FirebaseErrorWithoutForm = {
                'auth/requires-recent-login': reauthenticationToasts.error,
              };

              const error = errors[err.code];

              if (!error) {
                const { unknownErrorToast } = await import(
                  'utils/Toasts/unknownErrorToast'
                );
                unknownErrorToast();

                return;
              }

              error();
            }
          } finally {
            // setIsLoading(false);
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

            if (err instanceof FirebaseError) {
              const errors: FormFirebaseError = {
                'auth/wrong-password': {
                  type: 'password',
                  message: 'Senha incorreta',
                },
              };

              const error = errors[err.code];

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
          }
        });
      },
    }),
    [handleSubmit, onClose, setError, user?.displayName, user?.email]
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
