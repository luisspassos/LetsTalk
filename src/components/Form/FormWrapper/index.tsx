import { FormControl, FormControlProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
} & FormControlProps;

export function FormWrapper({ children, ...rest }: FormWrapperProps) {
  return (
    <FormControl
      {...rest}
      maxW='450px'
      as='form'
      bg='gray.200'
      borderRadius='5'
      p={{ base: '6', sm: '10' }}
      noValidate
    >
      {children}
    </FormControl>
  );
}
