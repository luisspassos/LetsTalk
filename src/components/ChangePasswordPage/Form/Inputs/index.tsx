import { Stack } from '@chakra-ui/react';
import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { PasswordInput } from './PasswordInput';
import { InputsProps as InputsPropsType } from 'utils/types';
import { ChangePasswordFormData } from '..';

type InputsProps = InputsPropsType<ChangePasswordFormData>;

export function Inputs({ errors, register }: InputsProps) {
  return (
    <Stack spacing='.3rem'>
      <PasswordInput error={errors.password} register={register} />
      <ConfirmPasswordInput
        error={errors.password_confirmation}
        register={register}
      />
    </Stack>
  );
}
