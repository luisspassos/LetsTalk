import { Modal as ModalComponent } from 'components/ConversationsPage/Messages/Modal';
import { Content } from './Content';
import { Footer } from './Footer';
import { ModalProps as ChakraModalProps } from '@chakra-ui/react';

type ModalProps = Omit<ChakraModalProps, 'children'>;

export function Modal({ onClose, isOpen }: ModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <Content />
      <Footer onClose={onClose} />
    </ModalComponent>
  );
}
