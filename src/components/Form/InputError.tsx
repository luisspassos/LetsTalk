import { FormErrorMessage } from '@chakra-ui/react';

export type InputErrorProps = {
  message: string;
};

export function InputError({ message }: InputErrorProps) {
  return (
    <FormErrorMessage mt='3px' color='red.600'>
      {message}
    </FormErrorMessage>
  );
}
