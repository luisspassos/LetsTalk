import { InputError } from '../../../../../../utils/types';
import { ModalInput } from '../../../../../Modal/ModalInput';
import { UseFormRegister } from 'react-hook-form';
import { ChangePasswordFormData } from '..';

type PasswordInputProps = {
  error: InputError;
  register: UseFormRegister<ChangePasswordFormData>;
};

export function PasswordInput({ error, register }: PasswordInputProps) {
  return (
    <ModalInput
      id='password'
      label='Novo Senha'
      placeholder='Digite sua nova senha'
      error={error}
      register={register}
      type='password'
    />
  );
}
