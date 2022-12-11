import { UseFormRegister } from 'react-hook-form';
import { RenameUsernameFormData } from '.';
import { InputError } from '../../../../../utils/types';
import { ModalInput } from '../../../../Modal/ModalInput';

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
