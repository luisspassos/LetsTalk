import { Box } from '@chakra-ui/react';
import { icons } from '.';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';

export function SelectedBar() {
  const { searchedEmojis } = useEmoji();

  const categoriesLength = icons.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <Box
      h={'4px'}
      pos='absolute'
      bottom={0}
      bgColor='gray.300'
      transition='.2s'
      w={width}
    />
  );
}
