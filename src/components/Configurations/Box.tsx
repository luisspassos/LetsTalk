import { Box as ChakraBox, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

type BoxProps = {
  title: string;
  children: ReactNode;
};

export function Box({ title, children }: BoxProps) {
  return (
    <ChakraBox>
      <Heading as='h1'>{title}</Heading>
      {children}
    </ChakraBox>
  );
}
