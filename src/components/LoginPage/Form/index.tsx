import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Form/Button';
import { FormWrapper } from 'components/Form/FormWrapper';
import { signInWithEmailAndPassword, useAuth } from 'contexts/AuthContext';
import router from 'next/router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { handleFormError } from 'utils/handleFormError';
import { toast } from 'utils/Toasts/toast';
import * as yup from 'yup';
import { DividerOr } from './DividerOr';
import { ForgotMyPasswordLink } from './ForgotMyPasswordLink';
import { Inputs } from './Inputs';
import { LoginButtonWithGoogle } from './LoginButtonWithGoogle';
import { RegistrationLink } from './RegistrationLink';

export type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const toasts = {
  emailVerification: {
    warning: () =>
      toast({
        status: 'warning',
        title: 'Seu email não foi verificado!',
        description: 'Enviamos um email de verificação para você.',
      }),
  },
};

export function Form() {
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
          const loginResult = await signInWithEmailAndPassword(data);

          const { user } = loginResult;

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
          await handleFormError<SignInFormData>(err, setError, {
            'auth/user-not-found': {
              type: 'email',
              message: 'Este usuário não existe',
            },
            'auth/wrong-password': {
              type: 'password',
              message: 'Senha incorreta',
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
