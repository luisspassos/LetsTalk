import { RiMenuFill } from 'react-icons/ri';
import { Icon as ChakraIcon, useColorModeValue } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';

export function Icon() {
  const { isOpen } = useTabToggle();

  const rotate = isOpen ? 0 : '90deg';

  return (
    <ChakraIcon
      as={RiMenuFill}
      transition='.3s'
      transform={`rotate(${rotate})`}
      fontSize='1.75rem'
      color={useColorModeValue('gray.400', 'gray.200')}
    />
  );
}
