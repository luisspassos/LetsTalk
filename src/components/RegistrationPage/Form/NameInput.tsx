import { Input } from 'components/Form/Input';
import { InputProps } from 'utils/types';

type NameInputProps = InputProps;

export function NameInput({ error, register }: NameInputProps) {
  return (
    <Input
      label='Nome'
      id='username'
      inputProps={{
        placeholder: 'Nome...',
        autoComplete: 'username',
        ...register('name'),
      }}
      error={error}
    />
  );
}
