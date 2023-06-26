import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type PasswordInputProps = InputProps;

export function PasswordInput({ error, register }: PasswordInputProps) {
  return (
    <Input
      label='Senha'
      id='password'
      inputProps={{
        type: 'password',
        placeholder: 'Senha...',
        'data-testid': 'password',
        autoComplete: 'new-password',
        ...register('password'),
      }}
      error={error}
    />
  );
}
