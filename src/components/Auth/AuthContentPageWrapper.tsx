import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AuthContentPageWrapper = {
  children: ReactNode;
} & FlexProps;

export function AuthContentPageWrapper({
  children,
  ...rest
}: AuthContentPageWrapper) {
  return (
    <Flex {...rest} px='10' align='center' flex='1' justify='center'>
      {children}
    </Flex>
  );
}
