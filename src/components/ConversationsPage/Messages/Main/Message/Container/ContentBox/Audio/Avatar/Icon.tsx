import { Icon as ChakraIcon } from '@chakra-ui/react';
import { BsFillMicFill } from 'react-icons/bs';

export function Icon() {
  return (
    <ChakraIcon
      fontSize='25px'
      bg='gray.400'
      as={BsFillMicFill}
      pos='absolute'
      borderRadius='50%'
      p='4px'
      bottom={0}
      right={0}
    />
  );
}
