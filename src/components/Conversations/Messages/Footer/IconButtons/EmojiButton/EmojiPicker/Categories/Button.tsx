import { useColorModeValue } from '@chakra-ui/react';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { useEmojiPickerScroll } from '../../../../../../../../contexts/EmojiPicker/EmojiPickerScrollContext';
import { useSearchedEmojis } from '../../../../../../../../contexts/EmojiPicker/SearchedEmojiContext';

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
    virtualizer,
    selectedCategoryIndex,
    categoryIndices,
    currentCategoryPosition,
  } = useEmojiPickerScroll();

  return (
    <ButtonComponent
      CategoryIcon={CategoryIcon}
      ariaLabel={ariaLabel}
      index={index}
      scrollToIndexFunc={virtualizer.scrollToIndex}
      selectedCategoryIndex={selectedCategoryIndex}
      categoryIndices={categoryIndices}
      currentCategoryPosition={currentCategoryPosition}
      {...rest}
    />
  );
}

const ButtonComponent = memo(
  ({
    scrollToIndexFunc,
    selectedCategoryIndex,
    categoryIndices,
    currentCategoryPosition,
    index,
    ariaLabel,
    CategoryIcon,
    ...rest
  }: any) => {
    const {
      searchedEmojis: { search, setSearch },
    } = useSearchedEmojis();

    const scrollToIndex = useCallback(
      (index: number) => {
        scrollToIndexFunc(index, { align: 'start' });
      },
      [scrollToIndexFunc]
    );

    useEffect(() => {
      function goToCategoryIfThereIsSearch() {
        if (selectedCategoryIndex.data === null || search) return;

        scrollToIndex(categoryIndices[selectedCategoryIndex.data]);

        setTimeout(() => {
          selectedCategoryIndex.set(null);
        }, 200);
      }

      goToCategoryIfThereIsSearch();
    }, [categoryIndices, scrollToIndex, search, selectedCategoryIndex]);

    function handleScrollToCategory() {
      if (search) {
        setSearch('');
        selectedCategoryIndex.set(index);

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
        <CategoryIcon />
      </button>
    );
  }
);

ButtonComponent.displayName = 'Button';
