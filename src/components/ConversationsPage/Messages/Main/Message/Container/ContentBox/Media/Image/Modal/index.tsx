import {
  ModalProps as ChakraModalProps,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { Modal as ModalComponent } from 'components/ConversationsPage/Messages/Modal';
import { FooterProps } from 'components/ConversationsPage/Messages/Modal/Content/Footer';
import { Footer } from './Footer';

type ModalProps = Omit<ChakraModalProps, 'children'>;

const url =
  'https://imgv3.fotor.com/images/blog-cover-image/Image-Upscaler-2.jpg';

const footerProps: FooterProps = {
  children: <Footer />,
};

export function Modal(props: ModalProps) {
  return (
    <ModalComponent footerProps={footerProps} {...props}>
      <ChakraImage maxH='70vh' src={url} alt='image' />
    </ModalComponent>
  );
}
