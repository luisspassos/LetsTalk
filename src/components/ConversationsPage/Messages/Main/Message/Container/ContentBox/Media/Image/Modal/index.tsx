import {
  ModalProps as ChakraModalProps,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { Modal as ModalComponent } from 'components/ConversationsPage/Messages/Modal';
import { Wrapper } from 'components/ConversationsPage/Messages/Modal/Content/Wrapper';
import { Footer } from './Footer';

type ModalProps = Omit<ChakraModalProps, 'children'> & {
  imgUrl: string;
};

export function Modal({ imgUrl, ...rest }: ModalProps) {
  const { onClose } = rest;

  return (
    <ModalComponent {...rest}>
      <Wrapper>
        <ChakraImage maxH='70vh' src={imgUrl} alt='image' />
      </Wrapper>
      <Footer onClose={onClose} />
    </ModalComponent>
  );
}
