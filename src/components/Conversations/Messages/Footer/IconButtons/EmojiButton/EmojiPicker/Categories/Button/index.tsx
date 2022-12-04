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
import { useIndexSelectedFromEmojiPickerCategories } from '../../../../../../../../../contexts/EmojiPicker/IndexSelectedFromEmojiPickerCategoriesContext';
import { Icon } from './Icon';
import { useMediaQuery } from '@chakra-ui/react';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  CategoryIcon: IconType;
  index: number;
} & DefaultButtonProps;

const transitionDuration = 200; // milliseconds;
const transitionDurationInSeconds = transitionDuration / 1000 + 's';

export const sharedStyles = {
  transitionDuration: transitionDurationInSeconds,
};

export function Button({
  index,
  CategoryIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const { selectedCategoryIndex } = useIndexSelectedFromEmojiPickerCategories();

  const {
    searchedEmojis: { search, setSearch },
  } = useSearchedEmojis();

  const {
    virtualizer: { scrollToIndex },
    categoryIndices,
  } = useEmojiPickerScroll();

  const scrollToIndexFormatted = useCallback(
    (index: number) => {
      scrollToIndex(index, { align: 'start' });
    },
    [scrollToIndex]
  );

  useEffect(() => {
    function goToCategoryIfThereIsSearch() {
      if (selectedCategoryIndex.current === null || search) return;

      scrollToIndexFormatted(categoryIndices[selectedCategoryIndex.current]);

      setTimeout(() => {
        selectedCategoryIndex.current = null;
      }, transitionDuration);
    }

    goToCategoryIfThereIsSearch();
  }, [categoryIndices, scrollToIndexFormatted, search, selectedCategoryIndex]);

  function handleScrollToCategory() {
    if (search) {
      setSearch('');

      selectedCategoryIndex.current = index;

      return;
    }

    scrollToIndexFormatted(categoryIndices[index]);
  }

  const [focus, setFocus] = useState(false);

  function handleAddFocus() {
    setFocus(true);
  }

  function handleRemoveFocus() {
    setFocus(false);
  }

  const [isSmallerThan430] = useMediaQuery('(max-width: 430px)');

  const styles = {
    height: isSmallerThan430 ? '40px' : '45px',
    boxShadow: focus ? 'var(--chakra-shadows-inner-blue)' : undefined,
  };

  return (
    <button
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 0,
        borderRadius: '8px',
        ...styles,
        ...sharedStyles,
      }}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={handleScrollToCategory}
      onFocus={handleAddFocus}
      onBlur={handleRemoveFocus}
      {...rest}
    >
      <Icon IconComponent={CategoryIcon} index={index} />
    </button>
  );
}