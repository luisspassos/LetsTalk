import { Input, useColorModeValue } from '@chakra-ui/react';

type SearchInputProps = {
  handleSearchEmoji: (search: string) => void;
};

export function SearchInput({ handleSearchEmoji }: SearchInputProps) {
  return (
    <Input
      placeholder='Pesquisar emoji'
      mt='10px'
      fontSize='15px'
      bgColor={useColorModeValue('white', 'blackAlpha.200')}
      h='40px'
      flexShrink={0}
      w='99.5%'
      mx='auto'
      onChange={(e) => handleSearchEmoji(e.target.value)}
    />
  );
}
