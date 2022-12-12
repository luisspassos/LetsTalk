import { Stack as ChakraStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonStack = {
  children: ReactNode;
};

export function Stack({ children }: ButtonStack) {
  return <ChakraStack mt={['14px', '17px', '20px']}>{children}</ChakraStack>;
}
