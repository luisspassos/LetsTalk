import {
  FormLabel,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormControl,
  FormLabelProps,
  FormHelperText,
  useColorModeValue,
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
    const helperTextColor = useColorModeValue('gray.900', 'gray.200');

    return (
      <FormControl isInvalid={!!error} flexDirection='column'>
        <FormLabel
          display='inline-block'
          mb='0'
          fontSize='17px'
          color={useColorModeValue('gray.400', 'gray.50')}
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </FormLabel>
        <ChakraInput
          ref={ref}
          h='49px'
          bg={useColorModeValue('white', 'gray.500')}
          id={id}
          {...inputProps}
        />
        <InputError message={error?.message ?? 'Erro'} />

        {helperText && (
          <FormHelperText
            fontSize={['12.5px', '13px', '14px']}
            color={helperTextColor}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';
