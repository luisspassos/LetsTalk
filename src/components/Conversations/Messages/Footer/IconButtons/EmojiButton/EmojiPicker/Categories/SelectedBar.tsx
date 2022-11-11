import { icons } from '.';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPickerScrollContext';
import { sharedStyles } from './Button';

export function SelectedBar() {
  const {
    searchedEmojis: { search },
  } = useEmoji();

  const { selectedCategoryPosition } = useEmojiPickerScroll();

  const categoriesLength = icons.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <div
      style={{
        height: search ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${selectedCategoryPosition * 100}%)`,
        width,
        ...sharedStyles,
      }}
    />
  );
}
