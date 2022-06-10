import { Collapse, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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

type EmojiResponse = {
  character: string;
};

export function EmojiPicker() {
  const [emojis, setEmojis] = useState<(string | undefined)[]>([]);
  const [categories, setCategories] = useState({
    data: [
      {
        icon: AiOutlineClockCircle,
        name: 'Recentes',
      },
      {
        icon: MdOutlineEmojiEmotions,
        name: 'Smileys e pessoas',
      },
      {
        icon: RiBearSmileLine,
        name: 'Animais e natureza',
      },
      {
        icon: IoFastFoodOutline,
        name: 'Comidas e bebidas',
      },
      {
        icon: BiFootball,
        name: 'Atividades',
      },
      {
        icon: AiOutlineCar,
        name: 'Viagens e lugares',
      },
      {
        icon: MdOutlineEmojiObjects,
        name: 'Objetos',
      },
      {
        icon: MdEmojiSymbols,
        name: 'Símbolos',
      },
      {
        icon: BsFlag,
        name: 'Bandeiras',
      },
    ],
    selectedCategoryIndex: 0,
  });

  const { isOpen } = useToggleEmojiPicker();

  const handleSelectCategory = useCallback((index: number) => {
    setCategories((prevState) => ({
      ...prevState,
      selectedCategoryIndex: index,
    }));
  }, []);

  useEffect(() => {
    async function getEmojis() {
      const response = await axios.get<EmojiResponse[]>(
        'https://emoji-api.com/emojis?access_key=3b3d5d290af59f56a0f468c8488c663b001a5f24'
      );

      const emojis = response.data
        .map(({ character }, i) => {
          if (i > 0 && i < 60) {
            return character;
          }
        })
        .filter(Boolean);

      setEmojis(emojis);
    }

    getEmojis();
  }, []);

  return (
    <Collapse in={isOpen}>
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
        <Flex direction='column' overflow='auto' pr='15px' pb='10px'>
          <SearchInput />
          <Stack spacing='20px' mt='15px'>
            <Stack spacing='5px'>
              <Heading
                as='h3'
                fontWeight='400'
                color='whiteAlpha.800'
                fontSize='15px'
              >
                Recentes
              </Heading>
              <Flex wrap='wrap'>
                {emojis.map((emoji) => {
                  return (
                    <Text
                      as='span'
                      d='flex'
                      alignItems='center'
                      justifyContent='center'
                      cursor='pointer'
                      fontSize='32px'
                      w='46px'
                      h='46px'
                      key={emoji}
                    >
                      {emoji}
                    </Text>
                  );
                })}
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Collapse>
  );
}
