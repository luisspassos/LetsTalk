import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { SearchInput } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { CategoryTitle } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';
import { emojiCategories } from '../utils/emojiCategories';
import { useEmoji, Emoji as EmojiType } from './EmojiContext';

type EmojiPickerScrollProviderProps = {
  children: ReactNode;
};

type CategoryIndices = number[];

type EmojiPickerScrollContextType = {
  parentRef: RefObject<HTMLDivElement>;
  virtualizer: ReturnType<typeof useVirtual>;
  components: (JSX.Element | EmojiRow)[];
  categoryIndices: CategoryIndices;
  selectedCategoryPosition: number;
};

type EmojiRow = JSX.Element[];

export const EmojiPickerScrollContext = createContext(
  {} as EmojiPickerScrollContextType
);

export function EmojiPickerScrollProvider({
  children,
}: EmojiPickerScrollProviderProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth || 0;

  const {
    emojiPickerStyles,
    searchedEmojis,
    searchedEmojis: { search },
  } = useEmoji();

  const emojisPerRow = Math.floor(width / emojiPickerStyles.emojiSize);

  const components: (JSX.Element | EmojiRow)[] = [
    <SearchInput key='searchInput' />,
  ];

  const categoryIndices: CategoryIndices = [];

  function insertEmojisAndInsertCategoryIndices() {
    function fillEmojiRows(emoji: EmojiType, rows: EmojiRow[]) {
      const getCurrentEmojiRow = () => {
        const index = rows.length - 1;

        return rows[index];
      };

      const row = getCurrentEmojiRow();

      const rowIsFilled = row.length === emojisPerRow;

      if (rowIsFilled) rows.push([]);

      const rowToBeFilled = getCurrentEmojiRow();

      rowToBeFilled.push(<Emoji key={emoji}>{emoji}</Emoji>);
    }

    function fillComponents(emojiRows: EmojiRow[]) {
      for (const row of emojiRows) {
        components.push(row);
      }
    }

    if (search.current) {
      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of searchedEmojis.data) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const categoryName in emojiCategories) {
      const categoryTitle = (
        <CategoryTitle key='category' text={categoryName} />
      );

      components.push(categoryTitle);

      categoryIndices.push(components.indexOf(categoryTitle));

      const category = emojiCategories[categoryName];

      const emojiRows: EmojiRow[] = [[]];

      for (const { emoji } of category) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);
    }
  }

  insertEmojisAndInsertCategoryIndices();

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0].index;

  const currentCategoryIndex =
    categoryIndices.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? Infinity;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices[0];

  console.log(categoryIndices);

  const selectedCategoryPosition = search.current
    ? 0
    : categoryIndices.indexOf(currentCategoryIndex);

  return (
    <EmojiPickerScrollContext.Provider
      value={{
        virtualizer,
        components,
        parentRef,
        categoryIndices,
        selectedCategoryPosition,
      }}
    >
      {children}
    </EmojiPickerScrollContext.Provider>
  );
}

export function useEmojiPickerScroll() {
  const data = useContext(EmojiPickerScrollContext);

  return data;
}
