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
import { CategoryButton } from './CategoryButton';
import { SearchInput } from './SearchInput';
import { SelectedCategoryBar } from './SelectedCategoryBar';
import { useToggleEmojiPicker } from '../../../../../../../contexts/ToggleEmojiPickerContext';
import { emojis } from '../../../../../../../utils/emojis';
import { CategoryTitle } from './CategoryTitle';
import { EmojiType } from '../../../../../../../types';
import { EmojiList } from './EmojiList';

type SearchedEmojis = {
  data: EmojiType[];
  isEmpty: boolean;
};
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

  const [searchedEmojis, setSearchedEmojis] = useState<SearchedEmojis>({
    data: [],
    isEmpty: true,
  });

  const { isOpen } = useToggleEmojiPicker();

  const handleSelectCategory = useCallback((index: number) => {
    setCategories((prevState) => ({
      ...prevState,
      selectedCategoryIndex: index,
    }));
  }, []);

  const handleSearchEmoji = useCallback((search: string) => {
    const searchFormatted = search.toLowerCase().trim();

    if (!searchFormatted) {
      setSearchedEmojis({ data: [], isEmpty: true });

      return;
    }

    const allEmojis = Object.values(emojis).flat();

    const searchedEmojis = allEmojis.filter(({ name }) =>
      name.toLowerCase().includes(searchFormatted)
    );

    setSearchedEmojis({ data: searchedEmojis, isEmpty: false });
  }, []);

  return (
    <Collapse in={isOpen} unmountOnExit>
      <Flex h='300px' w='100%' direction='column'>
        <Divider />
        <Flex pos='relative'>
          {categories.data.map(({ icon, name }, i) => (
            <CategoryButton
              selectedCategoryIndex={categories.selectedCategoryIndex}
              index={i}
              categoryIcon={icon}
              aria-label={name}
              key={name}
              onClick={() => handleSelectCategory(i)}
            />
          ))}
          <SelectedCategoryBar
            selectedCategoryIndex={categories.selectedCategoryIndex}
          />
        </Flex>
        <Flex
          direction='column'
          overflow='auto'
          pr='15px'
          pb={!searchedEmojis.isEmpty ? '0' : '10px'}
        >
          <SearchInput handleSearchEmoji={handleSearchEmoji} />
          {!searchedEmojis.isEmpty && (
            <EmojiList mt='15px' list={searchedEmojis.data} />
          )}
          <Stack spacing='20px' mt='15px'>
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
