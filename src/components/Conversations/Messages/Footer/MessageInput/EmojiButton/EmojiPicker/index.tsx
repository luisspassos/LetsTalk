import { Collapse, Flex, Stack } from '@chakra-ui/react';
import { useCallback } from 'react';

import { Divider } from '../../../../../../Divider';
import { SearchInput } from './SearchInput';
import { emojis } from '../../../../../../../utils/emojis';
import { CategoryTitle } from './Categories/CategoryTitle';
import { EmojiList } from './EmojiList';
import { Categories } from './Categories';
import { useEmoji } from '../../../../../../../contexts/EmojiContext';

export function EmojiPicker() {
  const {
    searchedEmojis: { data: searchedEmojis, setState: setSearchedEmojis },
    categories: { data: categories },
    togglePicker: { isOpen },
  } = useEmoji();

  const handleSearchEmoji = useCallback(
    (search: string) => {
      const searchFormatted = search.toLowerCase().trim();

      if (!searchFormatted) {
        setSearchedEmojis({ data: [], isEmpty: true });

        return;
      }

      const allEmojis = Object.keys(emojis).flatMap((e) => emojis[e]);

      const searchedEmojis = allEmojis.filter(({ name }) =>
        name.toLowerCase().includes(searchFormatted)
      );

      setSearchedEmojis({ data: searchedEmojis, isEmpty: false });
    },
    [setSearchedEmojis]
  );

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Flex h='300px' w='100%' direction='column'>
        <Divider />
        <Categories />
        <Flex
          direction='column'
          overflow='auto'
          pr='5px'
          pb={!searchedEmojis.isEmpty ? '0' : '10px'}
        >
          <SearchInput handleSearchEmoji={handleSearchEmoji} />
          {!searchedEmojis.isEmpty && (
            <EmojiList mt='15px' list={searchedEmojis.data} />
          )}
          <Stack spacing='15px' mt='15px'>
            {searchedEmojis.isEmpty &&
              categories.data
                .filter((category) => category.emojis.length !== 0)
                .map((category) => (
                  <Stack spacing='5px' key={category.name}>
                    <CategoryTitle text={category.name} />
                    <EmojiList list={category.emojis} />
                  </Stack>
                ))}
          </Stack>
        </Flex>
      </Flex>
    </Collapse>
  );
}
