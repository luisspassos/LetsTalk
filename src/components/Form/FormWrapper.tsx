import { FormControl } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
};

export function FormWrapper({ children }: FormWrapperProps) {
  return (
    <FormControl maxW='500px' as='form' bg='gray.200' borderRadius='5' p='10'>
      {children}
    </FormControl>
  );
}
