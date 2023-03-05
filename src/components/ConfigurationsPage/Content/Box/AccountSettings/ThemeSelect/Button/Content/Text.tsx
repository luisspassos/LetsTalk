import { Text as ChakraText, useColorMode } from '@chakra-ui/react';

export function Text() {
  const { colorMode } = useColorMode();

  return (
    <ChakraText fontSize='configurations-page-md'>
      {colorMode === 'light' ? 'Claro' : 'Escuro'}
    </ChakraText>
  );
}
