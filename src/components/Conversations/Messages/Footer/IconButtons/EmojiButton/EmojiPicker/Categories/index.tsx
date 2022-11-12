import { Box, Flex } from '@chakra-ui/react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';

import { Button } from './Button';
import { SelectedBar } from './SelectedBar';

export function Categories() {
  const { categories } = useEmoji();

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
