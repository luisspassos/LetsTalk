import { ChangePasswordFormData } from '..';
import { UseFormRegister } from 'react-hook-form';
import { ModalInput } from 'components/Modal/ModalInput';
import { InputError } from 'utils/types';

type PasswordConfirmationInputProps = {
  error: InputError;
  register: UseFormRegister<ChangePasswordFormData>;
};

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
