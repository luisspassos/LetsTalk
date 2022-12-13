import { ModalInput } from 'components/Modal/ModalInput';
import { InputProps as InputPropsType } from 'utils/types';

type InputProps = InputPropsType;

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
