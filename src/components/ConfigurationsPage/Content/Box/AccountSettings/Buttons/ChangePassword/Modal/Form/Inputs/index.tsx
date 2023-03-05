import { Stack } from '@chakra-ui/react';
import { ChangePasswordFormData } from '..';
import { PasswordConfirmationInput } from './PasswordConfirmationInput';
import { PasswordInput } from './PasswordInput';
import { InputsProps as InputsPropsType } from 'utils/types';

type InputsProps = InputsPropsType<ChangePasswordFormData>;

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
