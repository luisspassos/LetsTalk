import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangeEmailModal } from '../../../contexts/Modal/ChangeEmailModalContext';
import { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

type ChangeEmailFormData = {
  email: string;
};

type FormFirebaseError = Record<
  string,
  | {
      type: 'email';
      message: string;
    }
  | (() => void)
>;

const ChangeEmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
});

export const toasts = {
  changeEmail: {
    success: async () => {
      const { toast } = await import('../../../utils/Toasts/toast');

      toast({
        title: 'Email atualizado com sucesso!',
        description:
          'Você precisará verificar seu novo email ao fazer login novamente.',
        status: 'warning',
      });
    },
  },
};

export function ChangeEmailModal() {
  const { isOpen, onClose } = useChangeEmailModal();

  const { user: contextUser, fillUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailFormData>({
    resolver: yupResolver(ChangeEmailFormSchema),
  });

  const handleChangeEmail = useMemo(
    () =>
      handleSubmit(async ({ email }) => {
        try {
          const { updateEmail } = await import('firebase/auth');
          const { auth } = await import('../../../services/firebase');

          const user = auth.currentUser;

          if (!user) return;

          await updateEmail(user, email);

          if (!contextUser) return;

          fillUser({ ...contextUser, email });

          toasts.changeEmail.success();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const { reauthenticationToasts } = await import(
              '../../../utils/Toasts/reauthenticationToasts'
            );

            const errors: FormFirebaseError = {
              'auth/email-already-in-use': {
                type: 'email',
                message: 'Este email já está sendo usado',
              },
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
    [handleSubmit, contextUser, fillUser, setError]
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} modalTitle='Trocar email'>
      <ModalFormControl onSubmit={handleChangeEmail}>
        <ModalInput
          id='email'
          label='Novo Email'
          placeholder='Digite seu novo email'
          error={errors.email}
          register={register}
          type='email'
        />
        <Buttons
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonProps={{
            isLoading: isSubmitting,
          }}
          confirmButtonText='Trocar'
        />
      </ModalFormControl>
    </ModalWrapper>
  );
}
