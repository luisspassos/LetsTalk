import { Input, InputProps } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';

type PasswordInputProps = FormInputProps & {
  inputProps?: InputProps['inputProps'];
};

export function PasswordInput({
  error,
  register,
  inputProps,
}: PasswordInputProps) {
  return (
    <Input
      inputProps={{
        placeholder: 'Senha...',
        type: 'password',
        'data-testid': 'password',
        ...register('password'),
        ...inputProps,
      }}
      id='password'
      label='Senha'
      error={error}
    />
  );
}
