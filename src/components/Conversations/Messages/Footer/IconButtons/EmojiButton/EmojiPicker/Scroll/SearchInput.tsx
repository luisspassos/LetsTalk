import { Input, useColorModeValue } from '@chakra-ui/react';
import {
  useEmoji,
  formatValue,
} from '../../../../../../../../contexts/EmojiContext';

export function SearchInput() {
  const {
    searchedEmojis: { setSearch, search },
  } = useEmoji();

  function handleSearch(search: string) {
    const formattedSearch = formatValue(search);

    setSearch((prevState) => ({
      current: formattedSearch,
      prev: prevState.current,
    }));
  }

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
      value={search.current}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
