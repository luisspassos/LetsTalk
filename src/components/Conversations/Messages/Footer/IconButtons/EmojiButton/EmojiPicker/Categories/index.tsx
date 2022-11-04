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
import { useScroll } from '../../../../../../../../contexts/ScrollContext';
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
  const { virtualizer, components } = useScroll();

  const categoryComponents = components.filter(
    (component) => component.key === 'category'
  );

  const currentIndex = virtualizer.virtualItems[0].index;

  const categoryIndices = categoryComponents.map((c) => components.indexOf(c));

  const a = categoryIndices.filter((index) => currentIndex >= index);

  const b = categoryIndices.indexOf(a.pop());

  const c = b === -1 ? 0 : b;

  return (
    <Box>
      <Flex
        overflowX='auto'
        position='relative'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <SelectedBar b={c} />
        {categories.map(({ icon, name }, i) => (
          <Button
            categoryIndices={categoryIndices}
            b={c}
            index={i}
            CategoryIcon={icon}
            aria-label={name}
            key={name}
          />
        ))}
      </Flex>
    </Box>
  );
}
