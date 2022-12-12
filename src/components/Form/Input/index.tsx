import {
  InputProps as ChakraInputProps,
  FormControl,
  FormLabelProps,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';
import { InputError } from './InputError';
import { Label } from './Label';
import { Input as InputComponent } from './Input';
import { HelperText } from './HelperText';

type InputProps = {
  label: string;
  id: string;
  error?: FieldError;
  inputProps?: ChakraInputProps;
  labelProps?: FormLabelProps;
  helperText?: string;
};

export const Input = forwardRef(
  (
    { error, label, id, inputProps, labelProps, helperText }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <FormControl isInvalid={!!error} flexDirection='column'>
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>

        <InputComponent ref={ref} id={id} {...inputProps} />

        <InputError message={error?.message ?? 'Erro'} />

        {helperText && <HelperText>{helperText}</HelperText>}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';
