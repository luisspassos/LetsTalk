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
import { SelectedBar } from './SelectedBar';

export const icons = [
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
        align='start'
        justify='start'
        overflowX='auto'
        position='relative'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <SelectedBar />
        {categories.map(({ icon, name }, i) => (
          <Button index={i} CategoryIcon={icon} aria-label={name} key={name} />
        ))}
      </Flex>
    </Box>
  );
}
