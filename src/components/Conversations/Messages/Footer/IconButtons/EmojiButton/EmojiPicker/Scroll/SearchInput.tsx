import { Input, useColorModeValue } from '@chakra-ui/react';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';

export function SearchInput() {
  const {
    searchedEmojis: { search, setSearch },
  } = useSearchedEmojis();

  return (
    <Input
      placeholder='Pesquisar emoji'
      mt='10px'
      mb={search ? '8px' : '4px'}
      ml='1px'
      fontSize='15px'
      bgColor={useColorModeValue('white', 'blackAlpha.200')}
      h='40px'
      flexShrink={0}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
