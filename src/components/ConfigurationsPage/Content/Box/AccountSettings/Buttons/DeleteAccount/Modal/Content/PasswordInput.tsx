import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type PasswordInputProps = FormInputProps;

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
