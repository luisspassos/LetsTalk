import { Link, Stack } from '@chakra-ui/react';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
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
import { toast } from '../utils/Toasts/toast';
import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';

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

export const toasts = {
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
  }, [mode, actionCode]);

  // errors toasts
  useEffect(() => {
    if (errorParam === 'passwordreset') {
      toasts.passwordReset.error();
    }
  }, [errorParam]);

  // successes toasts
  useEffect(() => {
    if (successParam === 'passwordreset') {
      toasts.passwordReset.success();
    }
  }, [successParam]);

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
              const { unknownErrorToast } = await import(
                '../utils/Toasts/unknownErrorToast'
              );
              unknownErrorToast();
            } else {
              setError(error.type, {
                message: error.message,
              });
            }
          }
        }
      }),
    [handleSubmit, setError, signInWithEmailAndPassword, router]
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
              inputProps={{
                type: 'email',
                placeholder: 'Email...',
                ...register('email'),
              }}
              id='email'
              label='Email'
              error={errors.email}
            />
            <Input
              inputProps={{
                placeholder: 'Senha...',
                type: 'password',
              }}
              id='password'
              label='Senha'
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);

  const { mode, oobCode } = ctx.query;

  function ObjectIsEmpty(obj: object) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  try {
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (user.email_verified && ObjectIsEmpty(ctx.query)) {
      return {
        redirect: {
          destination: '/conversas',
          permanent: false,
        },
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

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
