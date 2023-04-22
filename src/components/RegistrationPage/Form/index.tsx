import { Stack } from '@chakra-ui/react';
import * as yup from 'yup';
import { FormWrapper } from 'components/Form/FormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { regexs } from 'utils/regexs';
import { EmailInput } from './EmailInput';
import { NameInput } from './NameInput';
import { PasswordInput } from './PasswordInput';
import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { Button } from 'components/Form/Button';
import { toast } from 'utils/Toasts/toast';

type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: keyof RegistrationFormData;
    message: string;
  }
>;

const registrationFormSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
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

export const successToastWhenRegistering = () =>
  toast({
    title: 'Cadastrado com sucesso',
    description: 'Acesse seu email e verifique sua conta para fazer login',
    status: 'success',
  });

export function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationFormSchema),
  });

  const handleRegister = useMemo(
    () =>
      handleSubmit(async ({ email, password, name }) => {
        try {
          const { auth } = await import('services/firebase');
          const { createUserWithEmailAndPassword, sendEmailVerification } =
            await import('firebase/auth');

          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await sendEmailVerification(user);

          const { setUsername, addUsernameInDb } = await import(
            'contexts/AuthContext'
          );

          const { username } = await setUsername({ user, name });
          await addUsernameInDb(username, user.uid);

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
              const { unknownErrorToast } = await import(
                'utils/Toasts/unknownErrorToast'
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
    [handleSubmit, setError]
  );

  return (
    <FormWrapper onSubmit={handleRegister}>
      <Stack spacing='10px'>
        <EmailInput error={errors.email} register={register} />
        <NameInput error={errors.name} register={register} />
        <PasswordInput error={errors.password} register={register} />
        <ConfirmPasswordInput
          error={errors.password_confirmation}
          register={register}
        />
        <Button isLoading={isSubmitting} text='CADASTRAR' type='submit' />
      </Stack>
    </FormWrapper>
  );
}
