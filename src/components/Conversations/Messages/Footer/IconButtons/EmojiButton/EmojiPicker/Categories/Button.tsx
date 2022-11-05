import { useColorModeValue } from '@chakra-ui/react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconType } from 'react-icons';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPickerScrollContext';

type ButtonProps = {
  CategoryIcon: IconType;
  index: number;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const transition = '.2s';

export function Button({
  index,
  CategoryIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();
  const { virtualizer } = useEmojiPickerScroll();
  const { selectedCategoryPosition, categoryIndices } = useEmojiPickerScroll();

  function handleScrollToCategory() {
    virtualizer.scrollToIndex(categoryIndices[index], { align: 'start' });
  }

  const color = {
    selected: useColorModeValue(
      'var(--chakra-colors-blackAlpha-800)',
      'var(--chakra-colors-whiteAlpha-800)'
    ),
    default: useColorModeValue(
      'var(--chakra-colors-blackAlpha-600)',
      'var(--chakra-colors-whiteAlpha-600)'
    ),
  };

  const isSelected = index === selectedCategoryPosition;
  const searchIsEmpty = !searchedEmojis;

  return (
    <button
      style={{
        color: isSelected && searchIsEmpty ? color.selected : color.default,
        flex: 1,
        minWidth: '50px',
        height: '45px',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition,
      }}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={handleScrollToCategory}
      {...rest}
    >
      <CategoryIcon />
    </button>
  );
}
