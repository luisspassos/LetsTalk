import { icons } from '.';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { transition } from './Button';

type SelectedBarProps = {
  b: number;
};

export function SelectedBar({ b }: SelectedBarProps) {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const categoriesLength = icons.length;
  const width = `${100 / categoriesLength}%`;

  return (
    <div
      style={{
        height: searchedEmojis ? '0px' : '4px',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'var(--chakra-colors-gray-300)',
        transform: `translateX(${b * 100}%)`,
        transition,
        width,
      }}
    />
  );
}
