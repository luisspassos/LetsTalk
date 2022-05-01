import { ReactNode } from 'react';
import { FormControl as ChakraFormControl } from '@chakra-ui/react';

type FormControlProps = {
  children: ReactNode;
};

export function ModalFormControl({ children }: FormControlProps) {
  return (
    <ChakraFormControl
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      {children}
    </ChakraFormControl>
  );
}
