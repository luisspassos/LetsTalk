import { Collapse, Flex, Stack } from '@chakra-ui/react';

import { Divider } from '../../../../../../Divider';
import { SearchInput } from './SearchInput';
import { CategoryTitle } from './Categories/CategoryTitle';
import { EmojiList } from './EmojiList';
import { Categories } from './Categories';
import { RawEmoji } from '../../../../../../../contexts/EmojiContext';
import { AiOutlineCar } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  MdOutlineEmojiEmotions,
  MdOutlineEmojiObjects,
  MdEmojiSymbols,
} from 'react-icons/md';
import { RiBearSmileLine } from 'react-icons/ri';
import { emojis } from '../../../../../../../utils/emojis';
import { Component } from './Component';

const data = [
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
];

function getOnlyEmojis(emojis: RawEmoji[]) {
  return emojis.map(({ emoji }) => emoji);
}

const newData = data.map(({ emojis, name, icon }) => ({
  icon,
  name,
  emojis: getOnlyEmojis(emojis),
}));

export function EmojiPicker() {
  // const {
  //   searchedEmojis: { data: searchedEmojis },
  //   togglePicker: { isOpen },
  //   emoji,
  // } = useEmoji();

  return (
    <Collapse in={true} unmountOnExit>
      <Flex h='300px' w='100%' direction='column'>
        <Divider />
        <Categories />
        <Flex
          direction='column'
          id='scrollEmojis'
          overflow='auto'
          pr='5px'
          pb={'10px'}
        >
          <SearchInput />
          {/* {!searchedEmojis.isEmpty && (
            <EmojiList mt='15px' list={searchedEmojis.data} />
          )} */}
          <Component />
          <Stack spacing='15px' mt='15px'>
            {
              // searchedEmojis.isEmpty &&
              newData.map((category) => (
                <Stack spacing='5px' key={category.name}>
                  <CategoryTitle text={category.name} />
                  <EmojiList list={category.emojis} />
                </Stack>
              ))
            }
          </Stack>
        </Flex>
      </Flex>
    </Collapse>
  );
}
