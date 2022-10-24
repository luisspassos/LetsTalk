import { Input, useColorModeValue } from '@chakra-ui/react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';

function formatValue(value: string) {
  // remove accents
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  value = value.toLowerCase().trim();

  return value;
}

export function SearchInput() {
  const {
    searchedEmojis: { setSearchedEmojis },
  } = useEmoji();

  async function handleSearch(search: string) {
    if (!search) {
      setSearchedEmojis(null);

      return;
    }

    const formattedSearch = formatValue(search);

    const { emojiCategories } = await import(
      '../../../../../../../../utils/emojiCategories'
    );

    const emojis = Object.keys(emojiCategories).flatMap(
      (e) => emojiCategories[e]
    );

    const searchedEmojis = emojis
      .filter(({ name }) => {
        const formattedName = formatValue(name);

        return formattedName.includes(formattedSearch);
      })
      .map((emoji) => emoji.emoji);

    setSearchedEmojis(searchedEmojis);
  }

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
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
