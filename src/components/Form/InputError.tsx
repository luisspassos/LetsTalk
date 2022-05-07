import { FormErrorMessage, useColorModeValue } from '@chakra-ui/react';

export type InputErrorProps = {
  message: string;
};

export function InputError({ message }: InputErrorProps) {
  return (
    <FormErrorMessage mt='3px' color={useColorModeValue('red.600', 'gray.50')}>
      {message}
    </FormErrorMessage>
  );
}
