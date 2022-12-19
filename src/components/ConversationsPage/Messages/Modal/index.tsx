import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';
import { Content } from './Content';

type ModalProps = ChakraModalProps;

export function Modal({ children, ...rest }: ModalProps) {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay bg='blackAlpha.700' />
      <Content>{children}</Content>
    </ChakraModal>
  );
}
