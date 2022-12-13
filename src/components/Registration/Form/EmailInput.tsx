import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type EmailInputProps = InputProps;

export function EmailInput({ register, error }: EmailInputProps) {
  return (
    <Input
      label='Email'
      id='email'
      inputProps={{
        type: 'email',
        placeholder: 'Email...',
        ...register('email'),
      }}
      error={error}
    />
  );
}
