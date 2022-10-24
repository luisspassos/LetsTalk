import { Box, Flex } from '@chakra-ui/react';
import { AiOutlineCar } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  MdEmojiSymbols,
  MdOutlineEmojiEmotions,
  MdOutlineEmojiObjects,
} from 'react-icons/md';
import { RiBearSmileLine } from 'react-icons/ri';
import { emojiCategories } from '../../../../../../../../utils/emojiCategories';
import { Button } from './Button';

const icons = [
  MdOutlineEmojiEmotions,
  RiBearSmileLine,
  IoFastFoodOutline,
  BiFootball,
  AiOutlineCar,
  MdOutlineEmojiObjects,
  MdEmojiSymbols,
  BsFlag,
];

const categories = Object.keys(emojiCategories).map((category, i) => ({
  name: category,
  icon: icons[i],
}));

export function Categories() {
  return (
    <Box>
      <Flex
        overflowX='auto'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map(({ icon, name }) => (
          <Button categoryIcon={icon} aria-label={name} key={name} />
        ))}
      </Flex>
    </Box>
  );
}
