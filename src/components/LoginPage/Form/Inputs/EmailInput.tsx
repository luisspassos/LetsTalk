import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type EmailInputProps = InputProps;

export function EmailInput({ error, register }: EmailInputProps) {
  return (
    <Input
      inputProps={{
        type: 'email',
        placeholder: 'Email...',
        ...register('email'),
      }}
      id='email'
      label='Email'
      error={error}
    />
  );
}
