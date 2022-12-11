import { Text as ChakraText, useColorMode } from '@chakra-ui/react';

export function Text() {
  const { colorMode } = useColorMode();

  return (
    <ChakraText fontSize={['14px', '15px', '16px']}>
      {colorMode === 'light' ? 'Claro' : 'Escuro'}
    </ChakraText>
  );
}
