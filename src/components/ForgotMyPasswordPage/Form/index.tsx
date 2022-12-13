import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from 'components/Form/FormWrapper';
import { useAuth } from 'contexts/AuthContext';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'utils/Toasts/toast';
import * as yup from 'yup';
import { Button } from './Button';
import { Input } from './Input';

type EmailFormData = {
  email: string;
};

type FormFirebaseError = Record<
  string,
  {
    type: keyof EmailFormData;
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

export const successToastWhenSendingToEmailToChangePassword = () =>
  toast({
    title: 'Email enviado',
    description: 'Cheque seu email para redefinir sua senha',
    status: 'success',
  });

export function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: yupResolver(emailFormSchema),
  });

  const { sendEmailToRecoverPassword } = useAuth();

  const handleSendEmail = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await sendEmailToRecoverPassword(data);

          successToastWhenSendingToEmailToChangePassword();
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
    [handleSubmit, sendEmailToRecoverPassword, setError]
  );

  return (
    <FormWrapper onSubmit={handleSendEmail}>
      <Input error={errors.email} register={register} />
      <Button isSubmitting={isSubmitting} />
    </FormWrapper>
  );
}
