import { Box, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { CategoryButton } from './CategoryButton';

export function Categories() {
  const {
    categories: { data: categories, setState: setCategories },
  } = useEmoji();

  const handleSelectCategory = useCallback(
    (index: number) => {
      setCategories((prevState) => ({
        ...prevState,
        selectedCategoryIndex: index,
      }));
    },
    [setCategories]
  );

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
      </Flex>
    </Box>
  );
}
