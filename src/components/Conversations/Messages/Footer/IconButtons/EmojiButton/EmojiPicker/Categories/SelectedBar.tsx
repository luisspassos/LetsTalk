import { useEmojiPicker } from '../../../../../../../../contexts/EmojiPickerContext';
import { sharedStyles } from './Button';

export function SelectedBar() {
  const {
    searchedEmojis: { search },
    categories,
    scroll: { currentCategoryPosition, selectedCategoryIndex },
  } = useEmojiPicker();

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
