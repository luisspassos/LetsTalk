import { InputLeftElement, Icon as ChakraIcon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export function Icon() {
  return (
    <InputLeftElement
      h='100%'
      pointerEvents='none'
      fontSize={['19px', '21px', '23px']}
      pl={['6px', '8px', '10px']}
    >
      <ChakraIcon as={FiSearch} />
    </InputLeftElement>
  );
}
