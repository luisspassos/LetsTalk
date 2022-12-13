import { useCategories } from 'contexts/EmojiPicker/CategoriesContext';
import { useEmojiPickerScroll } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { usePositionSelectedFromEmojiPickerCategories } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { useSearchedEmojis } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { transitionDurationInSeconds } from './Button';

export function SelectedBar() {
  const { categories } = useCategories();
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();
  const { currentCategoryPosition } = useEmojiPickerScroll();
  const { selectedCategoryPosition } =
    usePositionSelectedFromEmojiPickerCategories();

  const categoriesLength = categories.data.length;
  const width = `${100 / categoriesLength}%`;

  return (
    // chakra element isn't being used to perform the list

    <div
      style={{
        height: search ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${currentCategoryPosition * 100}%)`,
        transitionDuration: transitionDurationInSeconds,
        transitionProperty: selectedCategoryPosition.current
          ? 'height'
          : undefined,
        width,
      }}
    />
  );
}
