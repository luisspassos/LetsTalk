import { UseFormRegister } from 'react-hook-form/dist/types';
import { PasswordFormData } from '.';
import { InputError } from '../../../../utils/types';
import { ModalInput } from '../../../Modal/ModalInput';

type PasswordInputProps = {
  error: InputError;
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
