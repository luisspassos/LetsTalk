import { ModalInput } from 'components/Modal/ModalInput';
import { InputProps } from 'utils/types';

type PasswordInputProps = InputProps;

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
