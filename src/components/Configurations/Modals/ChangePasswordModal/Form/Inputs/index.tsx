import { Stack } from '@chakra-ui/react';
import { ChangePasswordFormData } from '..';
import { PasswordConfirmationInput } from './PasswordConfirmationInput';
import { PasswordInput } from './PasswordInput';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';

type Errors = UseFormReturn<ChangePasswordFormData>['formState']['errors'];

type InputsProps = {
  register: UseFormRegister<ChangePasswordFormData>;
  errors: Errors;
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
