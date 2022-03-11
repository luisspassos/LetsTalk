import { FormControl } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
};

export function FormWrapper({ children }: FormWrapperProps) {
  return (
    <FormControl
      maxW='450px'
      as='form'
      bg='gray.200'
      borderRadius='5'
      p={{ base: '6', sm: '10' }}
    >
      {children}
    </FormControl>
  );
}
