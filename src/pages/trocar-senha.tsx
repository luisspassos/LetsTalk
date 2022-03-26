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

type changePasswordFormData = {
  password: string;
  password_confirmation: string;
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

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordFormData>({
    resolver: yupResolver(changePasswordFormSchema),
  });

  const handleChangePassword = () => {};

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
