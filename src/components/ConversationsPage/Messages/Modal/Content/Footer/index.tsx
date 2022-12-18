import { HStack, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type FooterProps = { children: ReactNode } & StackProps;

export function Footer({ children, ...rest }: FooterProps) {
  return (
    <HStack as='footer' mt='5px' spacing='3px' {...rest}>
      {children}
    </HStack>
  );
}
