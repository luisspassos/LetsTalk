import { InputProps } from 'utils/types';
import { Input } from '..';

type EmailInputProps = InputProps;

export function EmailInput({ error, register }: EmailInputProps) {
  return (
    <Input
      id='email'
      label='email'
      error={error}
      inputProps={{
        'data-testid': 'email',
        type: 'email',
        autoComplete: 'email',
        placeholder: 'Email...',
        ...register('email'),
      }}
    />
  );
}
