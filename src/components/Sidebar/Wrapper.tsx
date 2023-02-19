import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Flex minH='100vh'>
      {/* <Sidebar /> */}
      {children}
    </Flex>
  );
}
