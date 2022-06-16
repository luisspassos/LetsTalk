import { Collapse, Flex, Stack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { AiOutlineCar, AiOutlineClockCircle } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  MdEmojiSymbols,
  MdOutlineEmojiEmotions,
  MdOutlineEmojiObjects,
} from 'react-icons/md';
import { RiBearSmileLine } from 'react-icons/ri';
import { Divider } from '../../../../../../Divider';
import { SearchInput } from './SearchInput';
import { useToggleEmojiPicker } from '../../../../../../../contexts/ToggleEmojiPickerContext';
import { emojis } from '../../../../../../../utils/emojis';
import { CategoryTitle } from './Categories/CategoryTitle';
import { EmojiList } from './EmojiList';
import { Categories } from './Categories';
import { useSearchedEmojis } from '../../../../../../../contexts/SearchedEmojisContext';

export function EmojiPicker() {
  const [categories, setCategories] = useState({
    data: [
      {
        icon: AiOutlineClockCircle,
        name: 'Recentes',
        emojis: [],
      },
      {
        icon: MdOutlineEmojiEmotions,
        name: 'Smileys e pessoas',
        emojis: [...emojis['smileys-emotion'], ...emojis['people-body']],
      },
      {
        icon: RiBearSmileLine,
        name: 'Animais e natureza',
        emojis: emojis['animals-nature'],
      },
      {
        icon: IoFastFoodOutline,
        name: 'Comidas e bebidas',
        emojis: emojis['food-drink'],
      },
      {
        icon: BiFootball,
        name: 'Atividades',
        emojis: emojis.activities,
      },
      {
        icon: AiOutlineCar,
        name: 'Viagens e lugares',
        emojis: emojis['travel-places'],
      },
      {
        icon: MdOutlineEmojiObjects,
        name: 'Objetos',
        emojis: emojis.objects,
      },
      {
        icon: MdEmojiSymbols,
        name: 'Símbolos',
        emojis: emojis.symbols,
      },
      {
        icon: BsFlag,
        name: 'Bandeiras',
        emojis: emojis.flags,
      },
    ],
    selectedCategoryIndex: 0,
  });

  const { isOpen } = useToggleEmojiPicker();

  const { searchedEmojis, setSearchedEmojis } = useSearchedEmojis();

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
        <Categories categories={categories} setCategories={setCategories} />
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
