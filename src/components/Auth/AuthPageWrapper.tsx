import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AuthPageWrapperProps = {
  children: ReactNode;
};

export function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  return (
    <Flex mx='auto' overflowX='hidden' maxW={1400} h='100vh' direction='column'>
      {children}
    </Flex>
  );
}
