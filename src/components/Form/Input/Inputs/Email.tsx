import { InputProps } from 'utils/types';
import { Input } from '..';
import * as yup from 'yup';

type EmailInputProps = InputProps;

export const emailSchema = () =>
  yup.string().trim().required('E-mail obrigatório').email('E-mail inválido');

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
