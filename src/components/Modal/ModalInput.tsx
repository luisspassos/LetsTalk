import { FieldError, UseFormRegister } from 'react-hook-form';
import { Input } from '../Form/Input';

type ModalInputProps = {
  id: string;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  placeholder: string;
  helperText?: string;
};

export function ModalInput({
  error,
  id,
  label,
  register,
  helperText,
  placeholder,
}: ModalInputProps) {
  return (
    <Input
      id={id}
      label={label}
      error={error}
      inputProps={{
        ...register(id),
        placeholder,
        h: ['39px', '42px', '45px'],
        borderColor: 'blueAlpha.900',
        fontSize: ['14px', '15px', '16px'],
      }}
      labelProps={{
        color: 'gray.900',
        opacity: 1,
        fontSize: ['15px', '15.5px', '16px'],
      }}
      helperText={helperText}
    />
  );
}
