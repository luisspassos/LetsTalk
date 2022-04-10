import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export function SearchInput() {
  return (
    <InputGroup alignItems='center' justifyContent='center' mb='14px'>
      <InputLeftElement h='100%' pointerEvents='none' fontSize='23px' pl='10px'>
        <Icon as={FiSearch} />
      </InputLeftElement>
      <Input
        borderRadius='15px'
        h='48px'
        bg='white'
        placeholder='Pesquisar conversa...'
        boxShadow='sm'
        pl='45px'
      />
    </InputGroup>
  );
}
