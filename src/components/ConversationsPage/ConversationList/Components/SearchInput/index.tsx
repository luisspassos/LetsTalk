import { InputGroup } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Input } from './Input';

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
      <Icon />
      <Input onChange={(e) => setSearch(e.target.value)} />
    </InputGroup>
  );
}
