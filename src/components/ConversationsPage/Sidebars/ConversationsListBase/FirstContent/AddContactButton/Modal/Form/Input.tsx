import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type UserInputProps = FormInputProps;

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
