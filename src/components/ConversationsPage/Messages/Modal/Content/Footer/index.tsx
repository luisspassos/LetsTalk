import { HStack, ModalProps, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type OnClose = ModalProps['onClose'];

type FooterProps = { children: ReactNode; onClose: OnClose } & StackProps;

export function Footer({ children, onClose, ...rest }: FooterProps) {
  return (
    <HStack as='footer' pt='5px' spacing='3px' onClick={onClose} {...rest}>
      {children}
    </HStack>
  );
}
