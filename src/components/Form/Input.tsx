import { FormLabel, InputGroup, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

type InputProps = {
  label: string;
  id: string;
} & ChakraInputProps;

export function Input({ label, id, ...rest }: InputProps) {
  return (
    <InputGroup flexDirection='column'>
      <FormLabel mb='0' fontSize='17px' color='gray.400' htmlFor={id}>
        {label}
      </FormLabel>
      <ChakraInput h='49px' bg='white' id={id} {...rest} />
    </InputGroup>
  );
}
