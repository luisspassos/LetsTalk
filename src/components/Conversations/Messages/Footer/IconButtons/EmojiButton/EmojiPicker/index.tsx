import { Collapse, Flex, Stack } from '@chakra-ui/react';

import { Divider } from '../../../../../../Divider';
import { SearchInput } from './SearchInput';
import { CategoryTitle } from './Categories/CategoryTitle';
import { EmojiList } from './EmojiList';
import { Categories } from './Categories';
import { useEmoji } from '../../../../../../../contexts/EmojiContext';

export function EmojiPicker() {
  const {
    searchedEmojis: { data: searchedEmojis },
    categories: { renderFilteredCategoryData },
    togglePicker: { isOpen },
  } = useEmoji();

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Flex h='300px' w='100%' direction='column'>
        <Divider />
        <Categories />
        <Flex
          direction='column'
          id='scrollEmojis'
          overflow='auto'
          pr='5px'
          pb={!searchedEmojis.isEmpty ? '0' : '10px'}
        >
          <SearchInput />
          {!searchedEmojis.isEmpty && (
            <EmojiList mt='15px' list={searchedEmojis.data} />
          )}
          <Stack spacing='15px' mt='15px'>
            {searchedEmojis.isEmpty &&
              renderFilteredCategoryData((category) => (
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
