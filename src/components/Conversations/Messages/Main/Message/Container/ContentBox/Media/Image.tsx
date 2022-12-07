import {
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
import { Button } from './Button';
import { Wrapper } from './Wrapper';

const url =
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=';

const borderRadius = '8px';

export function Image() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDownloadImage() {
    const fileName = url.split('/').pop();
    const el = document.createElement('a');
    el.setAttribute('href', url);

    if (!fileName) return;

    el.setAttribute('download', fileName);
    document.body.appendChild(el);
    el.click();
    el.remove();
  }

  return (
    <>
      <Wrapper>
        <ChakraImage src={url} alt='Image' cursor='pointer' onClick={onOpen} />
      </Wrapper>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg='blackAlpha.700' />
        <ModalContent bg='transparent' boxShadow='none' w='auto' my='0'>
          <ModalBody
            boxShadow='lg'
            borderRadius={borderRadius}
            bg='gray.400'
            p='5px'
          >
            <ChakraImage
              w='329px'
              h='493px'
              borderRadius={borderRadius}
              src={url}
              alt='image'
            />
          </ModalBody>
          <ModalFooter
            onClick={onClose}
            justifyContent='start'
            px='0'
            pb='0'
            // pt='5px'
            // gap='3px'
          >
            <Button aria-label='Fechar modal' icon={<MdOutlineClose />} />

            <Button
              aria-label='Fazer download da imagem'
              icon={<HiDownload />}
              onClick={handleDownloadImage}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
