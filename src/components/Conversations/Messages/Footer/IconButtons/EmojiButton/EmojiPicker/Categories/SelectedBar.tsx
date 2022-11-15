import { useCategories } from '../../../../../../../../contexts/EmojiPicker/CategoriesContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';
import { useSelectedCategoryIndex } from '../../../../../../../../contexts/EmojiPicker/SelectedCategoryIndexContext';
import { sharedStyles } from './Button';

export function SelectedBar() {
  const { categories } = useCategories();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();

  const { selectedCategoryIndex } = useSelectedCategoryIndex();

  const categoriesLength = categories.data.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <div
      style={{
        height: search ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${0 * 100}%)`,
        transitionProperty: selectedCategoryIndex ? 'height' : undefined,
        width,
        ...sharedStyles,
      }}
    />
  );
}
