import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ModalTitle } from './ModalTitle';

type Disclosure = Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>;

type ModalWrapperProps = Disclosure & {
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
      <ModalContent boxShadow={useColorModeValue('lg', 'md')} mx='10px'>
        {modalTitle && <ModalTitle text={modalTitle} />}
        <ModalCloseButton />
        <ModalBody pb='20px'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
