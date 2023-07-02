import { Input } from 'components/Form/Input';
import { FormInputProps } from 'utils/types';

type NameInputProps = FormInputProps;

export function NameInput({ error, register }: NameInputProps) {
  return (
    <Input
      label='Nome'
      id='username'
      inputProps={{
        'data-testid': 'name',
        placeholder: 'Nome...',
        autoComplete: 'username',
        ...register('name'),
      }}
      error={error}
    />
  );
}
