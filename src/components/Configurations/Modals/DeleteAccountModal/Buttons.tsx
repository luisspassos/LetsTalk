import { useEffect, useMemo, useState } from 'react';
import { PasswordFormData } from '.';
import { useAuth } from '../../../../contexts/AuthContext';
import { DangerousActionButtons } from '../../../Modal/DangerousAction/DangerousActionButtons';
import { UseFormReturn } from 'react-hook-form';
import { useDeleteAccountModal } from '../../../../contexts/Modal/DeleteAccountModalContext';

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

type IsSubmitting = Form['formState']['isSubmitting'];

type ButtonsProps = { isSubmitting: IsSubmitting } & FormProps;

export function Buttons({
  handleSubmit,
  setError,
  isSubmitting,
}: ButtonsProps) {
  const { user, signInWithEmailAndPassword, isLoggedInWithGoogle } = useAuth();
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
        const { auth } = await import('../../../../services/firebase');
        const currentUser = auth.currentUser;

        if (!currentUser) return;

        await deleteUser(currentUser);

        const { doc, deleteDoc } = await import('firebase/firestore');
        const { db } = await import('../../../../services/firebase');

        const { ref, deleteObject } = await import('firebase/storage');
        const { storage } = await import('../../../../services/firebase');
        const { checkIfFileExistsInStorage } = await import(
          '../../../../utils/checkIfTheFileExistsInStorage'
        );

        if (!user?.username) return;

        const userProfileAvatarPath = `usersProfileAvatar/${user.username}`;

        const userProfileAvatarRef = ref(storage, userProfileAvatarPath);

        const avatarExists = await checkIfFileExistsInStorage(
          userProfileAvatarPath
        );

        if (avatarExists) {
          await deleteObject(userProfileAvatarRef);
        }

        const userRef = doc(db, 'users', user.username);

        await deleteDoc(userRef);
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
                '../../../../utils/Toasts/reauthenticationToasts'
              );

              const errors: FirebaseErrorWithoutForm = {
                'auth/requires-recent-login': reauthenticationToasts.error,
              };

              const error = errors[err.code];

              if (!error) {
                const { unknownErrorToast } = await import(
                  '../../../../utils/Toasts/unknownErrorToast'
                );
                unknownErrorToast();

                return;
              }

              error();
            }
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
                  '../../../../utils/Toasts/unknownErrorToast'
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
    [
      handleSubmit,
      setError,
      signInWithEmailAndPassword,
      user?.email,
      user?.username,
    ]
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
