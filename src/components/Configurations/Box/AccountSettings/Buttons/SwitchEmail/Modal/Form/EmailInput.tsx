import { ModalInput } from 'components/Modal/ModalInput';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { InputError } from 'utils/types';
import { ChangeEmailFormData } from '.';

type EmailInputProps = {
  error: InputError;
  register: UseFormRegister<ChangeEmailFormData>;
};

export function EmailInput({ error, register }: EmailInputProps) {
  return (
    <ModalInput
      id='email'
      label='Novo Email'
      placeholder='Digite seu novo email'
      error={error}
      register={register}
      type='email'
    />
  );
}
