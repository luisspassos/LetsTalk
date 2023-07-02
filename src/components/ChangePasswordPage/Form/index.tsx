import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from 'components/Form/FormWrapper';
import { useRouter } from 'next/router';
import { ActionCode } from 'pages/trocar-senha';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from 'services/firebase';
import { toast } from 'utils/Toasts/toast';
import * as yup from 'yup';
import { Button } from './Button';
import { Inputs } from './Inputs';
import {
  passwordConfirmationSchema,
  passwordSchema,
} from 'components/Form/Input/Inputs/Password';

type FormProps = {
  actionCode: ActionCode;
};

export type ChangePasswordFormData = {
  password: string;
  password_confirmation: string;
};

const changePasswordFormSchema = yup.object().shape({
  password: passwordSchema(true),
  password_confirmation: passwordConfirmationSchema(),
});

export const errorToastWhenChangingPassword = () => {
  toast({
    status: 'error',
    title: 'Ocorreu um erro ao mudar a senha',
    description: 'Tente reenviar o email para verificar a senha novamente',
  });
};

export function Form({ actionCode }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordFormSchema),
  });

  const router = useRouter();

  const handleChangePassword = useMemo(
    () =>
      handleSubmit(async ({ password }) => {
        try {
          const { confirmPasswordReset } = await import('firebase/auth');

          await confirmPasswordReset(auth, actionCode, password);

          router.push('/?success=passwordreset');
        } catch {
          errorToastWhenChangingPassword();
        }
      }),
    [actionCode, handleSubmit, router]
  );

  return (
    <FormWrapper onSubmit={handleChangePassword}>
      <Inputs errors={errors} register={register} />
      <Button isSubmitting={isSubmitting} />
    </FormWrapper>
  );
}
