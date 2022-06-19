import { ReactNode } from 'react';
import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
} from '@chakra-ui/react';

type FormControlProps = {
  children: ReactNode;
} & ChakraFormControlProps;

export function ModalFormControl({ children, ...rest }: FormControlProps) {
  return (
    <ChakraFormControl
      as='form'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      {...rest}
    >
      {children}
    </ChakraFormControl>
  );
}
