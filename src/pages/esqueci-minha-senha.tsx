import { useMemo } from 'react';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import { FormTitle } from '../components/Form/FormTitle';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { CenterForm } from '../components/Form/CenterForm';
import { unknownErrorToast } from '../utils/Toasts/unknownErrorToast';
import { toast } from '../utils/Toasts/toast';

type emailFormData = {
  email: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: 'email';
    message: string;
  }
>;

const emailFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
});

export default function IForgotMyPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<emailFormData>({
    resolver: yupResolver(emailFormSchema),
  });

  const { sendEmailToRecoverPassword } = useAuth();

  const successToast = () =>
    toast({
      title: 'Email enviado',
      description: 'Cheque seu email para redefinir sua senha',
      status: 'success',
    });

  const handleSendEmail = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await sendEmailToRecoverPassword(data);

          successToast();
        } catch (err) {
          const { FirebaseError } = await import('firebase/app');

          if (err instanceof FirebaseError) {
            const errors: FormFirebaseError = {
              'auth/user-not-found': {
                type: 'email',
                message: 'Este usuário não existe',
              },
              'auth/too-many-requests': {
                type: 'email',
                message: 'Tente novamente mais tarde',
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
    [handleSubmit, sendEmailToRecoverPassword, setError]
  );

  return (
    <CenterForm>
      <FormTitle mb='1rem' text='Envie seu email para recuperar sua senha' />
      <FormWrapper onSubmit={handleSendEmail}>
        <Input
          {...register('email')}
          error={errors.email}
          id='email'
          type='email'
          label='Email'
          placeholder='Coloque seu email'
        />
        <Button
          isLoading={isSubmitting}
          type='submit'
          text='ENVIAR'
          mt='.5rem'
        />
      </FormWrapper>
      <BackLink text='Voltar' route='/' mt='1rem' />
    </CenterForm>
  );
}
