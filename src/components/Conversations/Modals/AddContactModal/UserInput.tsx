import { FieldError, UseFormRegister } from 'react-hook-form';
import { AddContactFormData } from '.';
import { Input } from '../../../Form/Input';

type UserInputProps = {
  register: UseFormRegister<AddContactFormData>;
  errors: {
    contactName?: FieldError | undefined;
  };
};

export function UserInput({ errors, register }: UserInputProps) {
  return (
    <Input
      id='contactName'
      label='Usuário'
      error={errors.contactName}
      inputProps={{
        ...register('contactName'),
        placeholder: 'Insira um usuário, exemplo: usuario#1234',
        h: ['39px', '42px', '45px'],
        borderColor: 'blueAlpha.900',
        fontSize: ['14px', '15px', '16px'],
      }}
      labelProps={{
        color: 'gray.900',
        opacity: 1,
        fontSize: ['15px', '15.5px', '16px'],
      }}
      helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
      clicando na foto na barra ao lado.'
    />
  );
}
