import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from 'components/Form/FormWrapper';
import { EmailInput, emailSchema } from 'components/Form/Input/Inputs/Email';
import { sendEmailToRecoverPassword } from 'contexts/AuthContext';
import { useCypress } from 'hooks/useCypress';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { cypressObject } from 'utils/cypressObject';
import { handleFormError } from 'utils/handleFormError';
import { toast } from 'utils/Toasts/toast';
import * as yup from 'yup';
import { Button } from './Button';

type EmailFormData = {
  email: string;
};

const emailFormSchema = yup.object().shape({
  email: emailSchema(),
});

export const successToastWhenSendingToEmailToChangePassword = () =>
  toast({
    title: 'Email enviado',
    description: 'Cheque seu email para redefinir sua senha',
    status: 'success',
  });

export const errorMessage = {
  userNotFound: 'Este usuário não existe',
};

const authMethods = cypressObject({ sendEmailToRecoverPassword });

export type AuthMethods = typeof authMethods;

export function Form() {
  useCypress('auth', authMethods);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: yupResolver(emailFormSchema),
  });

  const handleSendEmail = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await authMethods.sendEmailToRecoverPassword(data);

          successToastWhenSendingToEmailToChangePassword();
        } catch (err) {
          await handleFormError<EmailFormData>(err, setError, {
            'auth/user-not-found': {
              type: 'email',
              message: errorMessage.userNotFound,
            },
          });
        }
      }),
    [handleSubmit, setError]
  );

  return (
    <FormWrapper onSubmit={handleSendEmail}>
      <EmailInput error={errors.email} register={register} />
      <Button isSubmitting={isSubmitting} />
    </FormWrapper>
  );
}
