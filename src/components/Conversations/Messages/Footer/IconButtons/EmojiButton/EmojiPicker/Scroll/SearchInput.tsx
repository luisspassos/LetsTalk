import { Input, useColorModeValue } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';

export function SearchInput() {
  const {
    searchedEmojis: { setState: setSearchedEmojis },
  } = useEmoji();

  const handleSearchEmoji = useCallback(
    async (search: string) => {
      const searchFormatted = search.toLowerCase().trim();

      if (!searchFormatted) {
        setSearchedEmojis({ data: [], isEmpty: true });

        return;
      }

      const { emojis } = await import('../../../../../../../../utils/emojis');

      const allEmojis = Object.keys(emojis).flatMap((e) => emojis[e]);

      const searchedEmojis = allEmojis.filter(({ name }) =>
        name.toLowerCase().includes(searchFormatted)
      );

      setSearchedEmojis({ data: searchedEmojis, isEmpty: false });
    },
    [setSearchedEmojis]
  );

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
