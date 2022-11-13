import { useCategories } from '../../../../../../../../contexts/EmojiPicker/CategoriesContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';
import { sharedStyles } from './Button';

export function SelectedBar() {
  const { categories } = useCategories();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();
  const { currentCategoryPosition, selectedCategoryIndex } =
    useEmojiPickerScroll();

  const categoriesLength = categories.data.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <div
      style={{
        height: search ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${currentCategoryPosition * 100}%)`,
        transitionProperty: selectedCategoryIndex.data ? 'height' : undefined,
        width,
        ...sharedStyles,
      }}
    />
  );
}
