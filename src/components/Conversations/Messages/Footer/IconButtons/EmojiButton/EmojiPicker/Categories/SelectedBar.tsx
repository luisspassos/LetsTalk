import { Box } from '@chakra-ui/react';
import { icons } from '.';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { transition } from './Button';

type SelectedBarProps = {
  b: number;
};

export function SelectedBar({ b }: SelectedBarProps) {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const categoriesLength = icons.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <Box
      h={searchedEmojis ? '0px' : '4px'}
      pos='absolute'
      bottom={0}
      bgColor='gray.300'
      transition={transition}
      transform={`translateX(${b * 100}%)`}
      w={width}
    />
  );
}
