import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPickerScrollContext';
import { sharedStyles } from './Button';

export function SelectedBar() {
  const {
    searchedEmojis: { search },
    categories,
  } = useEmoji();

  const { selectedCategoryPosition, selectedCategoryIndex } =
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
        transform: `translateX(${selectedCategoryPosition * 100}%)`,
        transitionProperty: selectedCategoryIndex ? 'height' : undefined,
        width,
        ...sharedStyles,
      }}
    />
  );
}
