import { Stack as ChakraStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonStack = {
  children: ReactNode;
};

export function Stack({ children }: ButtonStack) {
  return <ChakraStack mt='1em'>{children}</ChakraStack>;
}
