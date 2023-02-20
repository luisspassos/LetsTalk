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
      sx={{
        aspectRatio: '1 / 0.09',
      }}
      minH='3.4375rem'
      align='center'
    >
      {children}
    </Flex>
  );
}
