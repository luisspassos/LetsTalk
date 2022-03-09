import { FormControl } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
};

export function FormWrapper({ children }: FormWrapperProps) {
  return <FormControl as='form'>{children}</FormControl>;
}
