import { FieldError } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { PasswordFormData } from '.';
import { ModalInput } from '../../../Modal/ModalInput';

type PasswordInputProps = {
  error: FieldError | undefined;
  register: UseFormRegister<PasswordFormData>;
};

export function PasswordInput({ error, register }: PasswordInputProps) {
  return (
    <ModalInput
      id='password'
      label='Senha'
      placeholder='Digite sua senha para apagar sua conta'
      error={error}
      register={register}
      type='password'
    />
  );
}
