import { ModalInput } from 'components/Modal/ModalInput';
import { InputProps } from 'utils/types';

type EmailInputProps = InputProps;

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
