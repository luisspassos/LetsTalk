import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons';

import { useMediaQuery } from '@chakra-ui/react';
import { useVirtual } from 'react-virtual';
import { Icon } from './Icon';
import { useEmojiPickerScroll } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { usePositionSelectedFromEmojiPickerCategories } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { useSearchedEmojis } from 'contexts/EmojiPicker/SearchedEmojiContext';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ScrollToIndex = ReturnType<typeof useVirtual>['scrollToIndex'];

type ButtonProps = {
  CategoryIcon: IconType;
  index: number;
  'data-testid': string;
} & Omit<DefaultButtonProps, 'ref'>;

type MemoButtonProps = {
  categoryIndex: number;
  selectedCategoryIndex: number;
  scrollToIndex: ScrollToIndex;
} & ButtonProps;

export const transitionDuration = 200; // milliseconds;
export const transitionDurationInSeconds = transitionDuration / 1000 + 's';

export function Button({
  index,
  CategoryIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const {
    virtualizer: { scrollToIndex },
    categoryIndices,
  } = useEmojiPickerScroll();

  const { selectedCategoryPosition } =
    usePositionSelectedFromEmojiPickerCategories();

  const categoryIndex = categoryIndices[index];
  const selectedCategoryIndex =
    categoryIndices[selectedCategoryPosition.current ?? 0];

  return (
    <MemoButton
      CategoryIcon={CategoryIcon}
      categoryIndex={categoryIndex}
      selectedCategoryIndex={selectedCategoryIndex}
      scrollToIndex={scrollToIndex}
      aria-label={ariaLabel}
      index={index}
      {...rest}
    />
  );
}

const MemoButton = memo(
  ({
    index,
    categoryIndex,
    selectedCategoryIndex,
    scrollToIndex,
    CategoryIcon,
    'aria-label': ariaLabel,
    ...rest
  }: MemoButtonProps) => {
    const {
      searchedEmojis: { search, setSearch },
    } = useSearchedEmojis();

    const { selectedCategoryPosition } =
      usePositionSelectedFromEmojiPickerCategories();

    const scrollToIndexFormatted = useCallback(
      (index: number) => {
        scrollToIndex(index, { align: 'start' });
      },
      [scrollToIndex]
    );

    useEffect(() => {
      function goToCategoryIfThereIsSearch() {
        if (selectedCategoryPosition.current === null || search) return;

        scrollToIndexFormatted(selectedCategoryIndex);

        setTimeout(() => {
          selectedCategoryPosition.current = null;
        }, transitionDuration);
      }

      goToCategoryIfThereIsSearch();
    }, [
      scrollToIndexFormatted,
      search,
      selectedCategoryIndex,
      selectedCategoryPosition,
    ]);

    function handleScrollToCategory() {
      if (search) {
        setSearch('');

        selectedCategoryPosition.current = index;

        return;
      }

      scrollToIndexFormatted(categoryIndex);
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
      // chakra element isn't being used to perform the list

      <button
        style={{
          flex: 1,
          outline: 0,
          borderRadius: '8px',
          ...styles,
        }}
        title={ariaLabel}
        aria-label={ariaLabel}
        onClick={handleScrollToCategory}
        onFocus={handleAddFocus}
        onBlur={handleRemoveFocus}
        {...rest}
      >
        <Icon
          testId={rest['data-testid']}
          IconComponent={CategoryIcon}
          index={index}
        />
      </button>
    );
  }
);

MemoButton.displayName = 'Memo Button';
