import { FieldError, UseFormRegister } from 'react-hook-form';
import { AddContactFormData } from '.';
import { ModalInput } from '../../../Modal/ModalInput';

type UserInputProps = {
  register: UseFormRegister<AddContactFormData>;
  errors: {
    contactName?: FieldError | undefined;
  };
};

export function UserInput({ errors, register }: UserInputProps) {
  return (
    <ModalInput
      id='contactName'
      error={errors.contactName}
      label='Usuário'
      placeholder='Insira um usuário, exemplo: usuario#1234'
      register={register}
      helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
      clicando na foto na barra ao lado.'
    />
  );
}
