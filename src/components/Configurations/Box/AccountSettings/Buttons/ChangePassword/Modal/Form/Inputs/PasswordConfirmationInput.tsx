import { ModalInput } from 'components/Modal/ModalInput';
import { InputProps } from 'utils/types';

type PasswordConfirmationInputProps = InputProps;

export function PasswordConfirmationInput({
  error,
  register,
}: PasswordConfirmationInputProps) {
  return (
    <ModalInput
      id='password_confirmation'
      label='Confirme sua senha'
      placeholder='Confirme sua nova senha'
      error={error}
      register={register}
      type='password'
    />
  );
}
