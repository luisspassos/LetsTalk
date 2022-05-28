import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { useChangePasswordModal } from '../../../contexts/Modal/ChangePasswordModalContext';
import { useMemo } from 'react';

type ChangePasswordFormData = {
  password: string;
  password_confirmation: string;
};

type FormFirebaseError = Record<
  string,
  | {
      type: 'password' | 'password_confirmation';
      message: string;
    }
  | (() => void)
>;

const ChangePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export const toasts = {
  changePassword: {
    success: async () => {
      const { toast } = await import('../../../utils/Toasts/toast');

      toast({ status: 'success', title: 'Senha mudada com sucesso!' });
    },
  },
};

export function ChangePasswordModal() {
  const { isOpen, onClose } = useChangePasswordModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(ChangePasswordFormSchema),
  });

  const handleChangePassword = useMemo(
    () =>
      handleSubmit(async ({ password }) => {
        try {
          const { updatePassword } = await import('firebase/auth');
          const { auth } = await import('../../../services/firebase');

          const user = auth.currentUser;

          if (!user) return;

          await updatePassword(user, password);

          toasts.changePassword.success();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const { reauthenticationToasts } = await import(
              '../../../utils/Toasts/reauthenticationToasts'
            );

            const errors: FormFirebaseError = {
              'auth/requires-recent-login': reauthenticationToasts.error,
            };

            const error = errors[err.code];

            if (!error) {
              const { unknownErrorToast } = await import(
                '../../../utils/Toasts/unknownErrorToast'
              );

              unknownErrorToast();

              return;
            }

            if (error instanceof Function) {
              error();

              return;
            }

            setError(error.type, {
              message: error.message,
            });
          }
        }
      }),
    [handleSubmit, setError]
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} modalTitle='Trocar senha'>
      <ModalFormControl>
        <Stack spacing={['8px', '10px', '12px']}>
          <ModalInput
            id='password'
            label='Novo Senha'
            placeholder='Digite sua nova senha'
            error={errors.password}
            register={register}
            type='password'
          />
          <ModalInput
            id='password_confirmation'
            label='Confirme sua senha'
            placeholder='Confirme sua nova senha'
            error={errors.password_confirmation}
            register={register}
            type='password'
          />
        </Stack>
        <Buttons
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonProps={{
            onClick: handleChangePassword,
            isLoading: isSubmitting,
          }}
          confirmButtonText='Trocar'
        />
      </ModalFormControl>
    </ModalWrapper>
  );
}
