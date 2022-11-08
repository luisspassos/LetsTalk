import { useColorModeValue } from '@chakra-ui/react';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from 'react';
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

export const sharedStyles = {
  transition: '0.2s',
  minWidth: '50px',
};

export function Button({
  index,
  CategoryIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const {
    searchedEmojis: { search, setSearch },
  } = useEmoji();

  const { selectedCategoryPosition, categoryIndices, virtualizer } =
    useEmojiPickerScroll();

  const [num, setNum] = useState<number | null>(null);

  useEffect(() => {
    if (num && !search) {
      virtualizer.scrollToIndex(categoryIndices[num], { align: 'start' });

      setNum(null);
    }
  }, [search, categoryIndices, virtualizer, num]);

  function handleScrollToCategory() {
    if (search) {
      setNum(index);
      setSearch((prevState) => ({
        current: '',
        prev: prevState.current,
      }));
    }

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
  const searchIsEmpty = !search;

  return (
    <button
      style={{
        color: isSelected && searchIsEmpty ? color.selected : color.default,
        flex: 1,
        height: '45px',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sharedStyles,
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
