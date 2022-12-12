import { ModalInput } from 'components/Modal/ModalInput';
import { UseFormRegister } from 'react-hook-form';
import { InputError } from 'utils/types';
import { RenameUsernameFormData } from '.';

type InputProps = {
  error: InputError;
  register: UseFormRegister<RenameUsernameFormData>;
};

export function Input({ error, register }: InputProps) {
  return (
    <ModalInput
      id='name'
      label='Nome'
      placeholder='Coloque seu novo nome'
      error={error}
      register={register}
    />
  );
}
