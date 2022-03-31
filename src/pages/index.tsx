import { Link, Stack } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { DividerOr } from '../components/Form/DividerOr';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { LoginButtonWithGoogle } from '../components/Form/LoginButtonWithGoogle';
import { Header } from '../components/Header';
import NextLink from 'next/link';
import { Button } from '../components/Form/Button';
import { RegistrationLink } from '../components/Form/RegistrationLink';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { ManEnteringImg } from '../components/ManEnteringImg';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AuthPageWrapper } from '../components/Auth/AuthPageWrapper';
import { AuthContentPageWrapper } from '../components/Auth/AuthContentPageWrapper';
import { auth } from '../services/firebase';
import { applyActionCode } from 'firebase/auth';
import { unknownErrorToast } from '../utils/Toasts/unknownErrorToast';
import { toast } from '../utils/Toasts/toast';

type SignInFormData = {
  email: string;
  password: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: 'email' | 'password';
    message: string;
  }
>;

type LoginProps = {
  actionCode: string;
  mode: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const Login = ({ actionCode, mode }: LoginProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const router = useRouter();

  const { signInWithEmailAndPassword } = useAuth();

  const toasts = {
    emailVerification: {
      error: () =>
        toast({
          status: 'error',
          title: 'Ocorreu um erro ao verificar o email',
          description: 'Tente reenviar o email novamente',
        }),
      success: () =>
        toast({
          status: 'success',
          title: 'Email verificado com sucesso',
        }),
      warning: () =>
        toast({
          status: 'warning',
          title: 'Seu email não foi verificado!',
          description: 'Enviamos um email de verificação para você.',
        }),
    },
    passwordReset: {
      error: () =>
        toast({
          status: 'error',
          title: 'Ocorreu um erro ao validar o código de redefinição de senha',
          description: 'Tente novamente.',
        }),
      success: () =>
        toast({
          status: 'success',
          title: 'Senha atualizada com sucesso',
        }),
    },
  };

  const {
    error: errorParam,
    success: successParam,
    mode: modeParam,
  } = router.query;

  useEffect(() => {
    if (errorParam || successParam || modeParam) router.replace('/');
  }, [errorParam, router, successParam, modeParam]);

  // verify email
  useEffect(() => {
    if (mode === 'verifyEmail') {
      (async () => {
        try {
          await applyActionCode(auth, actionCode);
          toasts.emailVerification.success();
        } catch {
          toasts.emailVerification.error();
        }
      })();
    }
  }, [mode, actionCode, toasts.emailVerification]);

  // errors toasts
  useEffect(() => {
    if (errorParam === 'passwordreset') {
      toasts.passwordReset.error();
    }
  }, [errorParam, toasts.passwordReset]);

  // successes toasts
  useEffect(() => {
    if (successParam === 'passwordreset') {
      toasts.passwordReset.success();
    }
  }, [successParam, toasts.passwordReset]);

  const handleSignIn = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          const { user } = await signInWithEmailAndPassword(data);

          if (!user.emailVerified) {
            const { sendEmailVerification } = await import('firebase/auth');

            if (auth.currentUser) await sendEmailVerification(auth.currentUser);
            toasts.emailVerification.warning();
            return;
          }

          router.push('/conversas');
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const errors: FormFirebaseError = {
              'auth/user-not-found': {
                type: 'email',
                message: 'Este usuário não existe',
              },
              'auth/wrong-password': {
                type: 'password',
                message: 'Senha incorreta',
              },
            };

            const error = errors[err.code];

            if (!error) {
              unknownErrorToast();
            } else {
              setError(error.type, {
                message: error.message,
              });
            }
          }
        }
      }),
    [
      handleSubmit,
      setError,
      signInWithEmailAndPassword,
      router,
      toasts.emailVerification,
    ]
  );

  return (
    <AuthPageWrapper>
      <Header />
      <AuthContentPageWrapper gap='90px'>
        <ManEnteringImg />
        <FormWrapper onSubmit={handleSignIn}>
          <LoginButtonWithGoogle />
          <DividerOr />
          <Stack spacing={2}>
            <Input
              type='email'
              id='email'
              label='Email'
              placeholder='Email...'
              {...register('email')}
              error={errors.email}
            />
            <Input
              type='password'
              id='password'
              label='Senha'
              placeholder='Senha...'
              {...register('password')}
              error={errors.password}
            />
          </Stack>
          <NextLink href='/esqueci-minha-senha' passHref>
            <Link
              mt='6px'
              mb='12px'
              fontSize='15px'
              color='gray.400'
              d='inline-block'
            >
              Esqueci minha senha
            </Link>
          </NextLink>
          <Button isLoading={isSubmitting} type='submit' text='ENTRAR' />

          <RegistrationLink />
        </FormWrapper>
      </AuthContentPageWrapper>
    </AuthPageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { mode, oobCode } = query;

  if (mode === 'resetPassword') {
    return {
      redirect: {
        destination: `/trocar-senha/?oobCode=${oobCode}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      mode: mode ?? null,
      actionCode: oobCode ?? null,
    },
  };
};

export default Login;
