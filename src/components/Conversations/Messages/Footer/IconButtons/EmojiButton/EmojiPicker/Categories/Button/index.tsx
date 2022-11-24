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
import { Icon } from './Icon';

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
};

export function Button({
  index,
  CategoryIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const { selectedCategoryIndex } = useSelectedCategoryIndex();

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

        // here
      }, 200);
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

  return (
    <button
      style={{
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
      <Icon IconComponent={CategoryIcon} index={index} />
    </button>
  );
}
