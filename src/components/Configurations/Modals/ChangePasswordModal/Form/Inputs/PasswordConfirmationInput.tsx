import { ChangePasswordFormData } from '..';
import { InputError } from '../../../../../../utils/types';
import { ModalInput } from '../../../../../Modal/ModalInput';
import { UseFormRegister } from 'react-hook-form';

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
