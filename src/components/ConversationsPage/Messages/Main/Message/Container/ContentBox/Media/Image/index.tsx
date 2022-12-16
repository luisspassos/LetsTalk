import { Image as ChakraImage, useDisclosure } from '@chakra-ui/react';
import { Wrapper } from '../Wrapper';
import { Modal } from './Modal';

const url =
  'https://imgv3.fotor.com/images/blog-cover-image/Image-Upscaler-2.jpg';

export function Image() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Wrapper>
        <ChakraImage src={url} alt='Image' cursor='pointer' onClick={onOpen} />
      </Wrapper>
      <Modal imgUrl={url} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
