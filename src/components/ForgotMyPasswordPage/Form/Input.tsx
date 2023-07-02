import { Input as InputComponent } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';

type InputProps = FormInputProps;

export function Input({ error, register }: InputProps) {
  return (
    <InputComponent
      error={error}
      id='email'
      inputProps={{
        placeholder: 'Coloque seu email',
        type: 'email',
        ...register('email'),
      }}
      label='Email'
    />
  );
}
