import { Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonStack = {
  children: ReactNode;
};

export function ButtonStack({ children }: ButtonStack) {
  return <Stack>{children}</Stack>;
}
