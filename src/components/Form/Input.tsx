import {
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormControl,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';
import { InputError } from './InputError';

type InputProps = {
  label: string;
  id: string;
  error: FieldError | undefined;
} & ChakraInputProps;

export const Input = forwardRef(
  (
    { error, label, id, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <FormControl isInvalid={!!error} flexDirection='column'>
        <FormLabel mb='0' fontSize='17px' color='gray.400' htmlFor={id}>
          {label}
        </FormLabel>
        <ChakraInput ref={ref} h='49px' bg='white' id={id} {...rest} />
        {!!error?.message && <InputError message={error.message} />}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';
