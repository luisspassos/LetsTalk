import { ModalFormControl } from '../../../../Modal/ModalFormControl';
import { Buttons } from './Buttons';
import { EmailInput } from './EmailInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../../contexts/AuthContext';

export type ChangeEmailFormData = {
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

async function getToast() {
  const { toast } = await import('../../../../../utils/Toasts/toast');

  return { toast };
}

export const toasts = {
  changeEmail: {
    success: async () => {
      const { toast } = await getToast();

      toast({
        title: 'Email atualizado com sucesso!',
        description: 'Você precisará verificar seu novo email.',
        status: 'warning',
      });
    },
    sameEmail: async () => {
      const { toast } = await getToast();

      toast({
        title: 'Você já está usando este email!',
        status: 'warning',
      });
    },
  },
};

export function Form() {
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
          if (email === contextUser?.email) {
            toasts.changeEmail.sameEmail();
            return;
          }

          const { updateEmail, sendEmailVerification } = await import(
            'firebase/auth'
          );
          const { auth } = await import('../../../../../services/firebase');

          const user = auth.currentUser;

          if (!user) return;

          await updateEmail(user, email);
          await sendEmailVerification(user);

          if (!contextUser) return;

          fillUser({ ...contextUser, email });

          toasts.changeEmail.success();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const { reauthenticationToasts } = await import(
              '../../../../../utils/Toasts/reauthenticationToasts'
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
                '../../../../../utils/Toasts/unknownErrorToast'
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
    [contextUser, fillUser, handleSubmit, setError]
  );

  return (
    <ModalFormControl onSubmit={handleChangeEmail}>
      <EmailInput error={errors.email} register={register} />
      <Buttons isSubmitting={isSubmitting} />
    </ModalFormControl>
  );
}
