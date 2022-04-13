import {
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormControl,
  FormLabelProps,
  FormHelperText,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';
import { InputError } from './InputError';

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
        <FormLabel
          mb='0'
          fontSize='17px'
          color='gray.400'
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </FormLabel>
        <ChakraInput ref={ref} h='49px' bg='white' id={id} {...inputProps} />
        <InputError message={error?.message ?? 'Erro'} />

        {helperText && (
          <FormHelperText color='gray.900'>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';
