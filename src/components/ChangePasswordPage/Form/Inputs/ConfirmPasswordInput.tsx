import { Input } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';

type ConfirmPasswordInputProps = FormInputProps;

export function ConfirmPasswordInput({
  error,
  register,
}: ConfirmPasswordInputProps) {
  return (
    <Input
      id='confirmNewPassword'
      error={error}
      label='Confirme sua senha'
      inputProps={{
        ...register('password_confirmation'),
        type: 'password',
        placeholder: 'Confirme sua nova senha...',
      }}
    />
  );
}
