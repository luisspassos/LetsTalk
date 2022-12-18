import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';
import { Content } from './Content';
import { FooterProps } from './Content/Footer';

type ModalProps = ChakraModalProps & {
  footerProps: FooterProps;
};

export function Modal({ children, footerProps, ...rest }: ModalProps) {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay bg='blackAlpha.700' />
      <Content footerProps={footerProps}>{children}</Content>
    </ChakraModal>
  );
}
