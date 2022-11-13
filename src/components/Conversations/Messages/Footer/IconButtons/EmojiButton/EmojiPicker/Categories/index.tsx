import { Box, Flex } from '@chakra-ui/react';
import { useEmojiPicker } from '../../../../../../../../contexts/EmojiPickerContext';

import { Button } from './Button';
import { SelectedBar } from './SelectedBar';

export function Categories() {
  const { categories } = useEmojiPicker();

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
        {categories.data.map(({ icon, name }, i) => (
          <Button index={i} CategoryIcon={icon} aria-label={name} key={name} />
        ))}
      </Flex>
    </Box>
  );
}
