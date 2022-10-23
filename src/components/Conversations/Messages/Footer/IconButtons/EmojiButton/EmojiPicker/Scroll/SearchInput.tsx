import { Input, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function SearchInput() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  // const {
  //   searchedEmojis: { setState: setSearchedEmojis },
  // } = useEmoji();

  // const handleSearchEmoji = useCallback(
  //   async (search: string) => {
  //     const searchFormatted = search.toLowerCase().trim();

  //     if (!searchFormatted) {
  //       setSearchedEmojis({ data: [], isEmpty: true });

  //       return;
  //     }

  //     const { emojis } = await import(
  //       '../../../../../../../../utils/emojiCategories'
  //     );

  //     const allEmojis = Object.keys(emojis).flatMap((e) => emojis[e]);

  //     const searchedEmojis = allEmojis.filter(({ name }) =>
  //       name.toLowerCase().includes(searchFormatted)
  //     );

  //     setSearchedEmojis({ data: searchedEmojis, isEmpty: false });
  //   },
  //   [setSearchedEmojis]
  // );

  return (
    <Input
      placeholder='Pesquisar emoji'
      mt='10px'
      mb='4px'
      ml='1px'
      fontSize='15px'
      bgColor={useColorModeValue('white', 'blackAlpha.200')}
      h='40px'
      flexShrink={0}
      w='98.5%'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
