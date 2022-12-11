import { useColorMode, Icon as ChakraIcon } from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';

export function Icon() {
  const { colorMode } = useColorMode();

  return <ChakraIcon as={colorMode === 'light' ? BiSun : BiMoon} />;
}
