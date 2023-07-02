import { Input } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';

type ConfirmPasswordInputProps = FormInputProps;

export function ConfirmPasswordInput({
  error,
  register,
}: ConfirmPasswordInputProps) {
  return (
    <Input
      label='Confirmar senha'
      id='confirmPassword'
      inputProps={{
        'data-testid': 'password_confirmation',
        placeholder: 'Confirme sua senha...',
        autoComplete: 'new-password',
        type: 'password',
        ...register('password_confirmation'),
      }}
      error={error}
    />
  );
}
