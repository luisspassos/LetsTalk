import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ModalFormControl } from '../../../../../../../../Modal/ModalFormControl';
import * as yup from 'yup';
import { Inputs } from './Inputs';
import { Buttons } from './Buttons';

export type ChangePasswordFormData = {
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
      const { toast } = await import('utils/Toasts/toast');

      toast({ status: 'success', title: 'Senha mudada com sucesso!' });
    },
  },
};

export function Form() {
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
          const { auth } = await import('services/firebase');

          const user = auth.currentUser;

          if (!user) return;

          await updatePassword(user, password);

          toasts.changePassword.success();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const { reauthenticationToasts } = await import(
              'utils/Toasts/reauthenticationToasts'
            );

            const errors: FormFirebaseError = {
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
    <ModalFormControl onSubmit={handleChangePassword}>
      <Inputs register={register} errors={errors} />
      <Buttons isSubmitting={isSubmitting} />
    </ModalFormControl>
  );
}
