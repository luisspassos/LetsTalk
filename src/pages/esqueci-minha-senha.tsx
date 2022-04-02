import { useEffect, useMemo, useState } from 'react';
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
import { Flex, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';

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

type NextRouterType = {
  components: any;
} & NextRouter;

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

const fadeIn = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export default function IForgotMyPassword() {
  const [enableAnimation, setEnableAnimation] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = useMemo(
    () => (prefersReducedMotion ? undefined : `${fadeIn} 0.5s`),
    [prefersReducedMotion]
  );

  const router = useRouter() as NextRouterType;
  const routerComponents = router.components;

  useEffect(() => {
    if (Object.keys(routerComponents).length > 2) {
      setEnableAnimation(true);
    }
  }, [routerComponents]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<emailFormData>({
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
      <Flex
        direction='column'
        align='center'
        animation={enableAnimation ? animation : undefined}
      >
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
      </Flex>
    </CenterForm>
  );
}
