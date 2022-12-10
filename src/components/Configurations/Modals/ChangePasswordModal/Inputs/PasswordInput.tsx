import { InputError } from '../../../../../utils/types';
import { ModalInput } from '../../../../Modal/ModalInput';

type PasswordInput = {
  error: InputError;
  register: UseFormRegister<>;
};

export function PasswordInput() {
  return (
    <ModalInput
      id='password'
      label='Novo Senha'
      placeholder='Digite sua nova senha'
      error={errors.password}
      register={register}
      type='password'
    />
  );
}
