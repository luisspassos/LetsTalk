import {
  FormControl,
  FormControlProps,
  useColorModeValue,
} from '@chakra-ui/react';
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
      bg={useColorModeValue('gray.200', 'gray.400')}
      borderRadius='5'
      p={{ base: '6', sm: '10' }}
      noValidate
    >
      {children}
    </FormControl>
  );
}
