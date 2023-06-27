import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type EmailInputProps = InputProps;

export function EmailInput({ error, register }: EmailInputProps) {
  return (
    <Input
      inputProps={{
        'data-testid': 'email',
        type: 'email',
        placeholder: 'Email...',
        autoComplete: 'email',
        ...register('email'),
      }}
      id='email'
      label='Email'
      error={error}
    />
  );
}
