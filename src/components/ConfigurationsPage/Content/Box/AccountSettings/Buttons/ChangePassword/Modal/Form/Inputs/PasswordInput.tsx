import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type PasswordInputProps = FormInputProps;

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
