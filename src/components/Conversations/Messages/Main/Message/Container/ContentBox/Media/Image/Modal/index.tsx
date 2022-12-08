import { ModalOverlay, Modal as ChakraModal } from '@chakra-ui/react';
import { UseDisclosure } from '../../../../../../../../../../utils/types';
import { Content } from './Content';

type ModalProps = {
  isOpen: UseDisclosure['isOpen'];
  onClose: UseDisclosure['onClose'];
  imgUrl: string;
};

export function Modal({ isOpen, onClose, imgUrl }: ModalProps) {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay bg='blackAlpha.700' />
      <Content imgUrl={imgUrl} />
    </ChakraModal>
  );
}
