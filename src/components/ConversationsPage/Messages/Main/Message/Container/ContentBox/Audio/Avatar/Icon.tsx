import { Icon as ChakraIcon } from '@chakra-ui/react';
import { BsFillMicFill } from 'react-icons/bs';

export function Icon() {
  return (
    <ChakraIcon
      fontSize='1.6em'
      bg='inherit'
      as={BsFillMicFill}
      pos='absolute'
      borderRadius='50%'
      p='.15em'
      bottom={0}
      right={0}
    />
  );
}
