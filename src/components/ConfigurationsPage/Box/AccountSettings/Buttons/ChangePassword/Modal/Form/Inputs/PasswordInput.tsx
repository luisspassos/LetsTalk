import { ModalInput } from 'components/Modal/ModalInput';
import { InputProps } from 'utils/types';

type PasswordInputProps = InputProps;

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
