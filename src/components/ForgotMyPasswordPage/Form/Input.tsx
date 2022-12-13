import { Input as InputComponent } from 'components/Form/Input';
import { InputProps as InputPropsType } from 'utils/types';

type InputProps = InputPropsType;

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
