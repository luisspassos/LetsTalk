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
import { cypressObject } from 'utils/cypressObject';
import { confirmPasswordReset } from 'firebase/auth';
import { useCypress } from 'hooks/useCypress';
import { UseToastOptions } from '@chakra-ui/react';

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

export const errorToastWhenChangingPassword = {
  opts: {
    status: 'error',
    title: 'Ocorreu um erro ao mudar a senha',
    description: 'Tente reenviar o email para verificar a senha novamente',
  } as UseToastOptions,
  get display() {
    return () => {
      toast(this.opts);
    };
  },
};

errorToastWhenChangingPassword.opts = {
  status: 'error',
  title: 'Ocorreu um erro ao mudar a senha',
  description: 'Tente reenviar o email para verificar a senha novamente',
} as UseToastOptions;

const authMethods = cypressObject({ confirmPasswordReset });

export type AuthMethods = typeof authMethods;

export function Form({ actionCode }: FormProps) {
  useCypress('auth', authMethods);

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
          await authMethods.confirmPasswordReset(auth, actionCode, password);

          router.push('/?success=passwordreset');
        } catch {
          errorToastWhenChangingPassword.display();
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
