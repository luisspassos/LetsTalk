import { Image as ChakraImage, useDisclosure } from '@chakra-ui/react';
import { Wrapper } from '../Wrapper';
import { Modal } from './Modal';

const url =
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=';

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
