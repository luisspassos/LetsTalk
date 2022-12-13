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
      minH={['55px', '70px', '85px']}
      py='10px'
      align='center'
      gap='9px'
    >
      {children}
    </Flex>
  );
}
