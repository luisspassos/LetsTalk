import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type ConfirmPasswordInputProps = InputProps;

export function ConfirmPasswordInput({
  error,
  register,
}: ConfirmPasswordInputProps) {
  return (
    <Input
      label='Confirmar senha'
      id='confirmPassword'
      inputProps={{
        placeholder: 'Confirme sua senha...',
        autoComplete: 'new-password',
        type: 'password',
        ...register('password_confirmation'),
      }}
      error={error}
    />
  );
}
