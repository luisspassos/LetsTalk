import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type PasswordConfirmationInputProps = FormInputProps;

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
