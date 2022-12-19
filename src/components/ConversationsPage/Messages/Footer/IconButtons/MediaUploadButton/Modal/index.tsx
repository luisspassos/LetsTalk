import { Modal as ModalComponent } from 'components/ConversationsPage/Messages/Modal';
import { Content } from './Content';
import { Footer } from './Footer';
import { ModalProps as ChakraModalProps } from '@chakra-ui/react';
import { ModalContent } from '..';

type ModalProps = Omit<ChakraModalProps, 'children'> & {
  content: ModalContent;
};

export function Modal({ onClose, isOpen, content }: ModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <Content content={content} />
      <Footer onClose={onClose} />
    </ModalComponent>
  );
}
