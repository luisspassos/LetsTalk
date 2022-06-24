import { Box, Collapse, Flex } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';

import { Divider } from '../../../../../../Divider';
import { emojis } from '../../../../../../../utils/emojis';
import { Categories } from './Categories';
import { useEmoji } from '../../../../../../../contexts/EmojiContext';
import { useVirtual } from 'react-virtual';
import { EmojiList } from './EmojiList';

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

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: categories.data.length,
    parentRef,
    overscan: 0,
  });

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Flex h='300px' w='100%' direction='column'>
        <Divider />
        <Categories />
        <Flex
          direction='column'
          overflow='auto'
          ref={parentRef}
          pr='5px'
          pb={!searchedEmojis.isEmpty ? '0' : '10px'}
        >
          <Box h={rowVirtualizer.totalSize} w='100%' pos='relative'>
            {rowVirtualizer.virtualItems.map((virtualRow) => {
              const category = categories.data[virtualRow.index];

              return (
                <Box
                  key={virtualRow.index}
                  ref={virtualRow.measureRef}
                  pos='absolute'
                  top={0}
                  left={0}
                  w='100%'
                  transform={`translateY(${virtualRow.start}px)`}
                >
                  <EmojiList list={category.emojis} />
                </Box>
              );
            })}
            {/* <Stack spacing='15px' mt='15px'>
              {searchedEmojis.isEmpty &&
                categories.data
                  .filter((category) => category.emojis.length !== 0)
                  .map((category) => (
                    <Stack spacing='5px' key={category.name}>
                      <CategoryTitle text={category.name} />
                      <EmojiList list={category.emojis} />
                    </Stack>
                  ))}
            </Stack> */}
          </Box>
        </Flex>
      </Flex>
    </Collapse>
  );
}
