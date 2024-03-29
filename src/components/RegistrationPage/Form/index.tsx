import { Stack } from '@chakra-ui/react';
import * as yup from 'yup';
import { FormWrapper } from 'components/Form/FormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { regexs } from 'utils/regexs';
import { NameInput } from './NameInput';
import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { Button } from 'components/Form/Button';
import { toast } from 'utils/Toasts/toast';
import { PasswordInput } from './PasswordInput';
import { EmailInput, emailSchema } from 'components/Form/Input/Inputs/Email';
import {
  passwordConfirmationSchema,
  passwordSchema,
} from 'components/Form/Input/Inputs/Password';
import { handleFormError } from 'utils/handleFormError';
import { useCypress } from 'hooks/useCypress';
import { cypressObject } from 'utils/cypressObject';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const registrationFormSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
  email: emailSchema(),
  password: passwordSchema(true),
  password_confirmation: passwordConfirmationSchema(),
});

export const successToastWhenRegistering = () =>
  toast({
    title: 'Cadastrado com sucesso',
    description: 'Acesse seu email e verifique sua conta para fazer login',
    status: 'success',
    id: 'success',
  });

export const errorMessage = {
  emailAlreadyInUse: 'Este email já está sendo usado',
};

const authMethods = cypressObject({ createUserWithEmailAndPassword });

export type AuthMethods = typeof authMethods;

export function Form() {
  useCypress('auth', authMethods);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationFormSchema),
  });

  const handleRegister = handleSubmit(async ({ email, password, name }) => {
    try {
      const [{ auth }, { sendEmailVerification }] = await Promise.all([
        import('services/firebase'),
        import('firebase/auth'),
      ]);

      const { user } = await authMethods.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const [{ setUsername, addUserInDb }] = await Promise.all([
        import('contexts/AuthContext'),
        sendEmailVerification(user),
      ]);

      const { username } = await setUsername({ user, name });

      await addUserInDb(username, user.uid);

      successToastWhenRegistering();
    } catch (err) {
      await handleFormError<RegistrationFormData>(err, setError, {
        'auth/email-already-in-use': {
          type: 'email',
          message: 'Este email já está sendo usado',
        },
      });
    }
  });

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
