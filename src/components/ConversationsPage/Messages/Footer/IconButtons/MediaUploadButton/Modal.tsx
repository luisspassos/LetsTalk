import {
  Box,
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  HStack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Video } from 'components/Video';

const borderRadius = '5px';

export function Modal() {
  const { isOpen, onClose } = useDisclosure();

  const size = useBreakpointValue(['sm', 'md']);

  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        p='5px'
        bg='transparent'
        boxShadow='none'
        my='0'
        maxW='auto'
        w='auto'
      >
        <Box
          borderRadius={borderRadius}
          mr='auto'
          bg='gray.400'
          p='5px'
          boxShadow='lg'
        >
          {/* <ChakraImage
            borderRadius={borderRadius}
            maxH='60vh'
            src={
              // 'https://imgv3.fotor.com/images/blog-cover-image/Image-Upscaler-2.jpg'
              './favicon.svg'
            }
            alt='image'
          /> */}
          <Video
            src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            maxH='60vh'
          />
        </Box>
        <HStack justify='end' as='footer' mt='5px' spacing='3px'>
          <Button
            size={size}
            bg='red.600'
            _hover={{
              bg: 'red.700',
            }}
            _active={{
              bg: 'red.700',
            }}
            onClick={onClose}
          >
            CANCELAR
          </Button>
          <Button
            size={size}
            bg='gray.400'
            _hover={{
              bg: 'gray.600',
            }}
          >
            ENVIAR
          </Button>
        </HStack>
      </ModalContent>
    </ChakraModal>
  );
}
