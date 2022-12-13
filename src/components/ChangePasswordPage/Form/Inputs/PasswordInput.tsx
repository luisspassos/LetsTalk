import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type PasswordInputProps = InputProps;

export function PasswordInput({ error, register }: PasswordInputProps) {
  return (
    <Input
      id='newPassword'
      error={error}
      label='Nova senha'
      inputProps={{
        ...register('password'),
        placeholder: 'Coloque sua nova senha...',
        type: 'password',
      }}
    />
  );
}
