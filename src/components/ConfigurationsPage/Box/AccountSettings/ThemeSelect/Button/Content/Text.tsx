import { Text as ChakraText, useColorMode } from '@chakra-ui/react';

export function Text() {
  const { colorMode } = useColorMode();

  return (
    <ChakraText fontSize='0.8em'>
      {colorMode === 'light' ? 'Claro' : 'Escuro'}
    </ChakraText>
  );
}
