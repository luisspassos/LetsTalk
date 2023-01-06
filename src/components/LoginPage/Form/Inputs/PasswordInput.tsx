import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type PasswordInputProps = InputProps;

export function PasswordInput({ error, register }: PasswordInputProps) {
  return (
    <Input
      inputProps={{
        placeholder: 'Senha...',
        type: 'password',
        autoComplete: 'current-password',
        ...register('password'),
      }}
      id='password'
      label='Senha'
      error={error}
    />
  );
}
