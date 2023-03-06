import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Flex
      flexShrink={0}
      as='header'
      justify='space-between'
      minW={0}
      h='5rem'
      align='center'
    >
      {children}
    </Flex>
  );
}
