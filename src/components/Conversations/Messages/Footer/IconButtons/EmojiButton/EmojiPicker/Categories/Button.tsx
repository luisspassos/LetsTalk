import { useColorModeValue } from '@chakra-ui/react';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPickerScrollContext';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  CategoryIcon: IconType;
  index: number;
} & DefaultButtonProps;

export const sharedStyles = {
  transitionDuration: '0.2s',
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

  const {
    selectedCategoryPosition,
    categoryIndices,
    virtualizer,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
  } = useEmojiPickerScroll();

  const scrollToIndex = useCallback(
    (index: number) => {
      virtualizer.scrollToIndex(index, { align: 'start' });
    },
    [virtualizer]
  );

  useEffect(() => {
    function goToCategoryIfThereIsSearch() {
      if (selectedCategoryIndex === null || search) return;

      scrollToIndex(categoryIndices[selectedCategoryIndex]);

      setTimeout(() => {
        setSelectedCategoryIndex(null);
      }, 200);
    }

    goToCategoryIfThereIsSearch();
  }, [
    selectedCategoryIndex,
    scrollToIndex,
    search,
    categoryIndices,
    setSelectedCategoryIndex,
  ]);

  function handleScrollToCategory() {
    if (search) {
      setSearch('');
      setSelectedCategoryIndex(index);

      return;
    }

    scrollToIndex(categoryIndices[index]);
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
      <CategoryIcon />
    </button>
  );
}
