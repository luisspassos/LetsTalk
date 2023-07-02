import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type InputProps = FormInputProps;

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
