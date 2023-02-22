import { InputLeftElement, Icon as ChakraIcon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export function Icon() {
  return (
    <InputLeftElement
      h='100%'
      pointerEvents='none'
      fontSize='1.2em'
      w='unset'
      pl='.7em'
    >
      <ChakraIcon as={FiSearch} />
    </InputLeftElement>
  );
}
