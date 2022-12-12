import { ModalInput } from 'components/Modal/ModalInput';
import { UseFormRegister } from 'react-hook-form';
import { InputError } from 'utils/types';
import { AddContactFormData } from '.';

type UserInputProps = {
  register: UseFormRegister<AddContactFormData>;
  error: InputError;
};

export function Input({ error, register }: UserInputProps) {
  return (
    <ModalInput
      register={register}
      error={error}
      id='contactName'
      label='Usuário'
      placeholder='Insira um usuário, exemplo: usuario#1234'
      helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
      clicando na foto na barra ao lado.'
    />
  );
}
