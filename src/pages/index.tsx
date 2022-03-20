import { Flex, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
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
import { useMemo } from 'react';

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

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { signInWithEmailAndPassword } = useAuth();

  const handleSignIn = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await signInWithEmailAndPassword(data);
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

            setError(error.type, {
              message: error.message,
            });
          }
        }
      }),
    [handleSubmit, setError, signInWithEmailAndPassword]
  );

  return (
    <Flex mx='auto' maxW={1400} h='100vh' direction='column'>
      <Header />
      <Flex px='10' gap='90px' align='center' flex='1' justify='center'>
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
      </Flex>
    </Flex>
  );
};

export default Login;
