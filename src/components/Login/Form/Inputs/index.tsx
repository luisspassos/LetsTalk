import { Stack } from '@chakra-ui/react';
import { Errors, InputProps } from 'utils/types';
import { SignInFormData } from '..';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';

export type InputsProps = {
  errors: Errors<SignInFormData>;
  register: InputProps['register'];
};

export function Inputs({ errors, register }: InputsProps) {
  return (
    <Stack spacing={2}>
      <EmailInput register={register} error={errors.email} />
      <PasswordInput register={register} error={errors.password} />
    </Stack>
  );
}
