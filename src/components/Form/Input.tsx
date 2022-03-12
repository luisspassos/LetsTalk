import {
  FormLabel,
  InputGroup,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ChakraInputProps;

export const Input = forwardRef(
  (
    { label, id, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => (
    <InputGroup flexDirection='column'>
      <FormLabel mb='0' fontSize='17px' color='gray.400' htmlFor={id}>
        {label}
      </FormLabel>
      <ChakraInput ref={ref} h='49px' bg='white' id={id} {...rest} />
    </InputGroup>
  )
);

Input.displayName = 'Input';
