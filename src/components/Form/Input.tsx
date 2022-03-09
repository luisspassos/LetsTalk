import { FormLabel, InputGroup, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

type InputProps = {
  label: string;
  id: string;
} & ChakraInputProps;

export function Input({ label, id, ...rest }: InputProps) {
  return (
    <InputGroup>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ChakraInput id={id} {...rest} />
    </InputGroup>
  );
}
