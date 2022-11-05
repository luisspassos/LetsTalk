import { icons } from '.';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPickerScrollContext';
import { transition } from './Button';

export function SelectedBar() {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const { selectedCategoryPosition } = useEmojiPickerScroll();

  const categoriesLength = icons.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <div
      style={{
        height: searchedEmojis ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${selectedCategoryPosition * 100}%)`,
        transition,
        width,
      }}
    />
  );
}
