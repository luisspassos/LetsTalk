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
      minH={['4.5rem', '5rem']}
      align='center'
      gap='.4rem'
    >
      {children}
    </Flex>
  );
}
