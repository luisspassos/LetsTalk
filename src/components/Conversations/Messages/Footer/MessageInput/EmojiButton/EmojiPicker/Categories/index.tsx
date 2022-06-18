import { Box, Flex } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { IconType } from 'react-icons';
import { CategoryButton } from './CategoryButton';

type Categories = {
  data: {
    icon: IconType;
    name: string;
    emojis: {
      emoji: string;
      name: string;
    }[];
  }[];
  selectedCategoryIndex: number;
};

type CategoriesProps = {
  categories: Categories;
  setCategories: Dispatch<SetStateAction<Categories>>;
};

export function Categories({ categories, setCategories }: CategoriesProps) {
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
