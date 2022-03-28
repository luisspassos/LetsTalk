import { Header } from '../components/Header';
import { Stack, Heading, Text } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';
import { AuthPageWrapper } from '../components/Auth/AuthPageWrapper';
import { AuthContentPageWrapper } from '../components/Auth/AuthContentPageWrapper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useErrorToast } from '../hooks/Toasts/useErrorToast';
import { useSuccessToast } from '../hooks/Toasts/useSuccessToast';

type FormFirebaseError = Record<
  string,
  {
    type: 'email' | 'password' | 'name' | 'password_confirmation';
    message: string;
  }
>;

type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const registrationFormSchema = yup.object().shape({
  name: yup.string().trim().required('Nome obrigatório'),
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationFormSchema),
  });

  const unknownErrorToast = useErrorToast();
  const successToastWhenRegistering = useSuccessToast(
    'Cadastrado com sucesso',
    'Acesse seu email e verifique sua conta para fazer login'
  );

  const handleRegister = useMemo(
    () =>
      handleSubmit(async ({ email, password }) => {
        try {
          const { auth } = await import('../services/firebase');
          const { createUserWithEmailAndPassword, sendEmailVerification } =
            await import('firebase/auth');

          await createUserWithEmailAndPassword(auth, email, password);

          if (auth.currentUser) await sendEmailVerification(auth.currentUser);
          successToastWhenRegistering();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const errors: FormFirebaseError = {
              'auth/email-already-in-use': {
                type: 'email',
                message: 'Este email já está sendo usado',
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
    [handleSubmit, setError, unknownErrorToast, successToastWhenRegistering]
  );

  return (
    <AuthPageWrapper>
      <Header />
      <AuthContentPageWrapper gap='150px'>
        <Stack color='blue.900' spacing='20px' d={{ base: 'none', xl: 'flex' }}>
          <Heading as='h1'>
            Mais de 200 mil usuários já
            <br /> estão conversando!
          </Heading>
          <Text fontSize='1.4rem'>
            Junte-se e converse com outras
            <br /> pessoas!
          </Text>
          <BackLink text='Fazer login' route='/' />
        </Stack>
        <FormWrapper onSubmit={handleRegister}>
          <Stack spacing='10px'>
            <Input
              label='Email'
              id='email'
              type='email'
              placeholder='Email...'
              {...register('email')}
              error={errors.email}
            />
            <Input
              label='Nome'
              id='username'
              placeholder='Nome...'
              {...register('name')}
              error={errors.name}
            />
            <Input
              label='Senha'
              id='password'
              type='password'
              placeholder='Senha...'
              {...register('password')}
              error={errors.password}
            />
            <Input
              label='Confirmar senha'
              id='confirmPassword'
              type='password'
              placeholder='Confirme sua senha...'
              {...register('password_confirmation')}
              error={errors.password_confirmation}
            />
            <Button isLoading={isSubmitting} text='CADASTRAR' type='submit' />
          </Stack>
        </FormWrapper>
      </AuthContentPageWrapper>
    </AuthPageWrapper>
  );
}
