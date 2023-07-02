import { Input, InputProps } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';
import * as yup from 'yup';

export const passwordMessage = {
  required: 'Senha obrigatória',
  min: 'No mínimo 6 caracteres',
  confirmation: 'As senhas precisam ser iguais',
};

/**
 * A function that returns a password schema from yup
 * @param min A boolean indicating if the password needs minimum characters
 * @returns a password schema
 */

export const passwordSchema = (min?: boolean) => {
  const schema = yup.string().required(passwordMessage.required);

  if (min) return schema.min(6, passwordMessage.min);

  return schema;
};

export const passwordConfirmationSchema = () =>
  yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais');

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
