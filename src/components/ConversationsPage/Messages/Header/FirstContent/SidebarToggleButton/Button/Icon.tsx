import { RiMenuFill } from 'react-icons/ri';
import { Icon as ChakraIcon, useColorModeValue } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';

export function Icon() {
  const { isOpen } = useTabToggle();

  const rotate = isOpen ? '90deg' : 0;

  return (
    <ChakraIcon
      as={RiMenuFill}
      transition='.3s transform'
      transform={`rotate(${rotate})`}
      color={useColorModeValue('gray.400', 'gray.200')}
    />
  );
}
