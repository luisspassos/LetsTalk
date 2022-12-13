import { Stack } from '@chakra-ui/react';
import { SignInFormData } from '..';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { InputsProps as InputsPropsType } from 'utils/types';

export type InputsProps = InputsPropsType<SignInFormData>;

export function Inputs({ errors, register }: InputsProps) {
  return (
    <Stack spacing={2}>
      <EmailInput register={register} error={errors.email} />
      <PasswordInput register={register} error={errors.password} />
    </Stack>
  );
}
