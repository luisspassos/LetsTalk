import { Box, Flex } from '@chakra-ui/react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { Button } from './Button';

export function Categories() {
  const {
    categories: { data: categories, renderFilteredCategoryData },
  } = useEmoji();

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
        {renderFilteredCategoryData(({ icon, name }, i) => (
          <Button
            selectedCategoryIndex={categories.selectedCategoryIndex}
            index={i}
            categoryIcon={icon}
            aria-label={name}
            key={name}
          />
        ))}
      </Flex>
    </Box>
  );
}
