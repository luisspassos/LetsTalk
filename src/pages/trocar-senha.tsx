import { Stack } from '@chakra-ui/react';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Form/Button';
import { CenterForm } from '../components/Form/CenterForm';
import { FormTitle } from '../components/Form/FormTitle';
import { FormWrapper } from '../components/Form/FormWrapper';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useRouter } from 'next/router';
import { toast } from '../utils/Toasts/toast';

type changePasswordFormData = {
  password: string;
  password_confirmation: string;
};

type ChangePasswordProps = {
  actionCode: string;
};

const changePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export const errorToastWhenChangingPassword = () => {
  toast({
    status: 'error',
    title: 'Ocorreu um erro ao mudar a senha',
    description: 'Tente reenviar o email para verificar a senha novamente',
  });
};

export default function ChangePassword({ actionCode }: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordFormData>({
    resolver: yupResolver(changePasswordFormSchema),
  });

  const router = useRouter();

  const handleChangePassword = useMemo(
    () =>
      handleSubmit(async ({ password }) => {
        try {
          const { confirmPasswordReset } = await import('firebase/auth');

          await confirmPasswordReset(auth, actionCode, password);

          router.push('/?success=passwordreset');
        } catch {
          errorToastWhenChangingPassword();
        }
      }),
    [handleSubmit, actionCode, router]
  );

  return (
    <CenterForm>
      <FormTitle mb='1rem' text='Trocar sua senha' />
      <FormWrapper onSubmit={handleChangePassword}>
        <Stack spacing='.3rem'>
          <Input
            id='newPassword'
            {...register('password')}
            error={errors.password}
            label='Nova senha'
            placeholder='Coloque sua nova senha...'
            type='password'
          />
          <Input
            id='confirmNewPassword'
            error={errors.password_confirmation}
            type='password'
            {...register('password_confirmation')}
            label='Confirme sua senha'
            placeholder='Confirme sua nova senha...'
          />
        </Stack>

        <Button
          isLoading={isSubmitting}
          text='REDEFINIR'
          mt='.7rem'
          type='submit'
        />
      </FormWrapper>

      <BackLink text='Voltar' route='/' mt='1rem' />
    </CenterForm>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const actionCode = query.oobCode as string;

  try {
    await verifyPasswordResetCode(auth, actionCode);
    return {
      props: {
        actionCode: actionCode,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/?error=passwordreset',
        permanent: false,
      },
    };
  }
};
