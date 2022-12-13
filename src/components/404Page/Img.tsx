import { useColorMode, Img as ChakraImg } from '@chakra-ui/react';

export function Img() {
  const { colorMode } = useColorMode();

  const src = `/images/page_not_found/${colorMode}.svg`;

  return (
    <ChakraImg
      w='602px'
      h='400px'
      src={src}
      alt='Pagína não encontrada'
      d={{ base: 'none', xl: 'block' }}
    />
  );
}
