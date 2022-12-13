import { Stack } from '@chakra-ui/react';
import { ChangePasswordFormData } from '..';
import { PasswordConfirmationInput } from './PasswordConfirmationInput';
import { PasswordInput } from './PasswordInput';
import { UseFormRegister } from 'react-hook-form';
import { Errors } from 'utils/types';

type InputsProps = {
  register: UseFormRegister<ChangePasswordFormData>;
  errors: Errors<ChangePasswordFormData>;
};

export function Inputs({ register, errors }: InputsProps) {
  return (
    <Stack spacing={['8px', '10px', '12px']}>
      <PasswordInput error={errors.password} register={register} />
      <PasswordConfirmationInput
        error={errors.password_confirmation}
        register={register}
      />
    </Stack>
  );
}
