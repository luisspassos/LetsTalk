import { Flex, Stack } from '@chakra-ui/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { DangerousActionButtons } from '../../../Modal/DangerousAction/DangerousActionButtons';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';
import { ModalInput } from '../../../Modal/ModalInput';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WarningText } from './WarningText';
import { useDeleteAccountModal } from '../../../../contexts/Modal/DeleteAccountModalContext';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useOnlineAtEvents } from '../../../../contexts/onlineAtEventsContext';

type PasswordFormData = {
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

const PasswordFormSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
});

export function DeleteAccountModal() {
  const { isOpen, onClose } = useDeleteAccountModal();
  const { user, signInWithEmailAndPassword, isLoggedInWithGoogle, fillUser } =
    useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // cleanup
    return () => {
      setIsLoading(false);
    };
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(PasswordFormSchema),
  });

  const { clearAllEvents } = useOnlineAtEvents();

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

        clearAllEvents();

        const userRef = doc(db, 'users', user.username);

        await deleteDoc(userRef);

        fillUser(undefined);
      },
      get loginWithGoogle() {
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
      get loginWithPassword() {
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
      user?.username,
      handleSubmit,
      setError,
      signInWithEmailAndPassword,
      user?.email,
      fillUser,
      clearAllEvents,
    ]
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center'>
        <Stack spacing='5px' align='center' mb='14px'>
          <DangerousActionIcon Icon={RiDeleteBin2Line} />
          <DangerousActionModalTitle text='Você deseja excluir sua conta?' />
        </Stack>
        {!isLoggedInWithGoogle && (
          <ModalInput
            id='password'
            label='Senha'
            placeholder='Digite sua senha para apagar sua conta'
            error={errors.password}
            register={register}
            type='password'
          />
        )}

        <DangerousActionButtons
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonProps={{
            isLoading: isLoggedInWithGoogle ? isLoading : isSubmitting,
            onClick: isLoggedInWithGoogle
              ? deleteAccount.loginWithGoogle
              : deleteAccount.loginWithPassword,
          }}
          confirmButtonText='Deletar'
        />
        <WarningText />
      </Flex>
    </ModalWrapper>
  );
}
