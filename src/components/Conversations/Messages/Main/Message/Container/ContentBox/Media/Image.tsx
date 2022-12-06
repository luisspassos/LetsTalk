import {
  Icon,
  IconButton,
  Image as ChakraImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { HiDownload } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { Wrapper } from './Wrapper';

const url =
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=';

export function Image() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Wrapper>
        <ChakraImage src={url} alt='Image' cursor='pointer' onClick={onOpen} />
      </Wrapper>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg='transparent'
          boxShadow='none'
          maxW='auto'
          w='auto'
          my='0'
        >
          <ModalBody p={0} maxW='auto'>
            <ChakraImage maxH='80vh' src={url} alt='image' />
          </ModalBody>
          <ModalFooter justifyContent='start' p={0}>
            <IconButton aria-label='Fechar modal' icon={<MdOutlineClose />} />
            <IconButton
              aria-label='Fazer download da imagem'
              icon={<Icon as={HiDownload} />}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
