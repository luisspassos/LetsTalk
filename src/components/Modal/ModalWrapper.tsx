import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { ModalTitle } from './ModalTitle';

type ModalWrapperProps = ModalProps & {
  modalTitle?: string;
};

export function ModalWrapper({
  modalTitle,
  children,
  ...rest
}: ModalWrapperProps) {
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent boxShadow={useColorModeValue('lg', 'md')} mx='10px'>
        {modalTitle && <ModalTitle text={modalTitle} />}
        <ModalCloseButton />
        <ModalBody pb='20px'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
