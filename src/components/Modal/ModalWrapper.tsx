import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ModalTitle } from './ModalTitle';

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  children: ReactNode;
};

export function ModalWrapper({
  children,
  isOpen,
  onClose,
  modalTitle,
}: ModalWrapperProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx='10px'>
        {modalTitle && <ModalTitle text={modalTitle} />}
        <ModalCloseButton />
        <ModalBody pb='20px'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
