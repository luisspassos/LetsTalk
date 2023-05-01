import { useColorMode, Img as ChakraImg } from '@chakra-ui/react';

export function Img() {
  const { colorMode } = useColorMode();

  const src = `/images/page_not_found/${colorMode}.svg`;

  return (
    <ChakraImg
      htmlWidth='602px'
      htmlHeight='400px'
      src={src}
      alt='Página não encontrada'
      d={{ base: 'none', xl: 'block' }}
    />
  );
}
