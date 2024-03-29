import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Form/Button';
import { FormWrapper } from 'components/Form/FormWrapper';
import { emailSchema } from 'components/Form/Input/Inputs/Email';
import { signInWithEmailAndPassword, useAuth } from 'contexts/AuthContext';
import router from 'next/router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { passwordSchema } from 'components/Form/Input/Inputs/Password';
import { handleFormError } from 'utils/handleFormError';
import { toast } from 'utils/Toasts/toast';
import * as yup from 'yup';
import { DividerOr } from './DividerOr';
import { ForgotMyPasswordLink } from './ForgotMyPasswordLink';
import { Inputs } from './Inputs';
import { LoginButtonWithGoogle } from './LoginButtonWithGoogle';
import { RegistrationLink } from './RegistrationLink';
import { useCypress } from 'hooks/useCypress';
import { cypressObject } from 'utils/cypressObject';

export type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: emailSchema(),
  password: passwordSchema(),
});

const toasts = {
  emailVerification: {
    warning: () =>
      toast({
        status: 'warning',
        title: 'Seu email não foi verificado!',
        description: 'Enviamos um email de verificação para você.',
        id: 'email verification',
      }),
  },
};

export const errorMessage = {
  userNotFound: 'Este usuário não existe',
  wrongPassword: 'Senha incorreta',
};

const authMethods = cypressObject({ signInWithEmailAndPassword });

export type AuthMethods = typeof authMethods;

export function Form() {
  useCypress('auth', authMethods);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { initializeUser } = useAuth();

  const handleSignIn = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          const { user } = await authMethods.signInWithEmailAndPassword(data);

          if (!user.emailVerified) {
            const { sendEmailVerification } = await import('firebase/auth');

            await sendEmailVerification(user);
            toasts.emailVerification.warning();
            return;
          }

          initializeUser({
            user,
          });

          await router.push('/conversas');
        } catch (err) {
          console.log(err);

          await handleFormError<SignInFormData>(err, setError, {
            'auth/user-not-found': {
              type: 'email',
              message: errorMessage.userNotFound,
            },
            'auth/wrong-password': {
              type: 'password',
              message: errorMessage.wrongPassword,
            },
          });
        }
      }),
    [handleSubmit, initializeUser, setError]
  );

  return (
    <FormWrapper onSubmit={handleSignIn}>
      <LoginButtonWithGoogle />
      <DividerOr />
      <Inputs errors={errors} register={register} />
      <ForgotMyPasswordLink />
      <Button isLoading={isSubmitting} type='submit' text='ENTRAR' />
      <RegistrationLink />
    </FormWrapper>
  );
}
