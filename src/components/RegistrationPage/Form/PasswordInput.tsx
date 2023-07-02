import { FormInputProps } from 'utils/types';
import { PasswordInput as Input } from 'components/Form/Input/Inputs/Password';

type PasswordInputProps = FormInputProps;

export function PasswordInput(props: PasswordInputProps) {
  return <Input {...props} inputProps={{ autoComplete: 'new-password' }} />;
}
