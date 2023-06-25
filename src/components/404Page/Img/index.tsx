import { Img as ChakraImg, useColorMode } from '@chakra-ui/react';

Img.useColorMode = useColorMode;

export function Img() {
  const { colorMode } = Img.useColorMode();

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
