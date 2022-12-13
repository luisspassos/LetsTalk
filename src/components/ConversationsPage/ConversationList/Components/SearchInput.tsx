import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchInput({ setSearch }: SearchInputProps) {
  return (
    <InputGroup
      alignItems='center'
      justifyContent='center'
      mb={['13px', '15px', '17px']}
    >
      <InputLeftElement
        h='100%'
        pointerEvents='none'
        fontSize={['19px', '21px', '23px']}
        pl={['6px', '8px', '10px']}
      >
        <Icon as={FiSearch} />
      </InputLeftElement>
      <Input
        fontSize={['14px', '15px', '16px']}
        borderRadius={['11px', '13px', '15px']}
        h={['40px', '44px', '48px']}
        bg={useColorModeValue('white', 'blackAlpha.500')}
        placeholder='Pesquisar conversa...'
        boxShadow='sm'
        pl={['39px', '42px', '45px']}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
}
