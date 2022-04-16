import {
  Button as ChakraButton,
  ButtonProps as ChakraButttonProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ChakraButttonProps;

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      w={['89px', '99px', '109px']}
      h={['36px', '38px', '40px']}
      fontSize={['14px', '15px', '16px']}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
