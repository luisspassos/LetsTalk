import { FormInputProps } from 'utils/types';
import { Input } from '..';
import * as yup from 'yup';

type EmailInputProps = FormInputProps;

export const emailMessage = {
  required: 'E-mail obrigatório',
  invalid: 'E-mail inválido',
};

const { invalid, required } = emailMessage;

export const emailSchema = () =>
  yup.string().trim().required(required).email(invalid);

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
