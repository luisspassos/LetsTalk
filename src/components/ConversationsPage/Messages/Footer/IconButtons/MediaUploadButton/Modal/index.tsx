import { useDisclosure } from '@chakra-ui/react';
import { Modal as ModalComponent } from 'components/ConversationsPage/Messages/Modal';
import { Content } from './Content';
import { Footer } from './Footer';

export function Modal() {
  const { isOpen, onClose } = useDisclosure();

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <Content />
      <Footer />
    </ModalComponent>
  );
}
