import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './Header';

type AuthPageWrapperProps = {
  children: ReactNode;
  'data-testid'?: string;
};

export function AuthPageWrapper({ children, ...rest }: AuthPageWrapperProps) {
  return (
    <Flex
      pb='20px'
      mx='auto'
      overflowX='hidden'
      maxW={1400}
      h='100vh'
      direction='column'
      {...rest}
    >
      <Header />
      {children}
    </Flex>
  );
}
