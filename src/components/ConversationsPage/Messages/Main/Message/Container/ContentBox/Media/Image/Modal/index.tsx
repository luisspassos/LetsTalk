import {
  ModalOverlay,
  Modal as ChakraModal,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { Content } from './Content';

type Disclosure = Pick<UseDisclosureReturn, 'onClose' | 'isOpen'>;

type ModalProps = Disclosure & {
  imgUrl: string;
};

export function Modal({ isOpen, onClose, imgUrl }: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg='blackAlpha.700' />
      <Content imgUrl={imgUrl} />
    </ChakraModal>
  );
}
