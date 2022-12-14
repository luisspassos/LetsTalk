import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Sidebar } from '.';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Flex minH='100vh'>
      <Sidebar />
      {children}
    </Flex>
  );
}
