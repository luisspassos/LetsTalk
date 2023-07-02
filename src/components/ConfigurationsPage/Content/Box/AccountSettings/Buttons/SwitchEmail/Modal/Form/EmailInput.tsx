import { ModalInput } from 'components/Modal/ModalInput';
import { FormInputProps } from 'utils/types';

type EmailInputProps = FormInputProps;

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
