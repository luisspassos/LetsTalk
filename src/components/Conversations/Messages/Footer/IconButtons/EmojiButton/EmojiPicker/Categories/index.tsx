import { Box, Flex } from '@chakra-ui/react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { CategoryButton } from './CategoryButton';

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
          <CategoryButton
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
