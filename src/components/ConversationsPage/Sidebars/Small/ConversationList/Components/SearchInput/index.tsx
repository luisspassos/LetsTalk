import { InputGroup } from '@chakra-ui/react';
import { Icon } from './Icon';
import { Input } from './Input';

export type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchInput({ setSearch }: SearchInputProps) {
  return (
    <InputGroup
      fontSize='0.9375em'
      alignItems='center'
      justifyContent='center'
      mb={['13px', '15px', '17px']}
    >
      <Icon />
      <Input setSearch={setSearch} />
    </InputGroup>
  );
}
