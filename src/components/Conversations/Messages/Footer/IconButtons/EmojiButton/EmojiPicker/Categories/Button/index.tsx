import { useColorModeValue } from '@chakra-ui/react';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { useEmojiPickerScroll } from '../../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';
import { useSelectedCategoryIndex } from '../../../../../../../../../contexts/EmojiPicker/SelectedCategoryIndexContext';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  Icon: IconType;
  index: number;
} & DefaultButtonProps;

export const sharedStyles = {
  transitionDuration: '0.2s',
};

export function Button({
  index,
  Icon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const { selectedCategoryIndex, setSelectedCategoryIndex } =
    useSelectedCategoryIndex();

  const {
    searchedEmojis: { search, setSearch },
  } = useSearchedEmojis();

  const {
    virtualizer: { scrollToIndex },
    categoryIndices,
    currentCategoryPosition,
  } = useEmojiPickerScroll();

  const scrollToIndexFormatted = useCallback(
    (index: number) => {
      scrollToIndex(index, { align: 'start' });
    },
    [scrollToIndex]
  );

  useEffect(() => {
    function goToCategoryIfThereIsSearch() {
      if (selectedCategoryIndex === null || search) return;

      scrollToIndexFormatted(categoryIndices[selectedCategoryIndex]);

      setTimeout(() => {
        setSelectedCategoryIndex(null);
      }, 200);
    }

    goToCategoryIfThereIsSearch();
  }, [
    categoryIndices,
    scrollToIndexFormatted,
    search,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
  ]);

  function handleScrollToCategory() {
    if (search) {
      setSearch('');
      setSelectedCategoryIndex(index);

      return;
    }

    scrollToIndexFormatted(categoryIndices[index]);
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

  const [focus, setFocus] = useState(false);

  function handleAddFocus() {
    setFocus(true);
  }

  function handleRemoveFocus() {
    setFocus(false);
  }

  const isSelected = index === currentCategoryPosition;
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
        outline: 0,
        boxShadow: focus ? 'var(--chakra-shadows-inner-blue)' : undefined,
        borderRadius: '8px',
        ...sharedStyles,
      }}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={handleScrollToCategory}
      onFocus={handleAddFocus}
      onBlur={handleRemoveFocus}
      {...rest}
    >
      <Icon />
    </button>
  );
}
