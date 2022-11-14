import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { SearchInput } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { CategoryTitle } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';
import { useEmojiStyles } from './EmojiStylesContext';
import { Emoji as EmojiType, useCategories } from './CategoriesContext';

import { useSearchedEmojis } from './SearchedEmojiContext';

type EmojiPickerScrollContextType = {
  virtualizer: ReturnType<typeof useVirtual>;
  currentCategoryPosition: number;
  parentRef: RefObject<HTMLDivElement>;
  components: (JSX.Element | EmojiRow)[];
  categoryIndices: number[];
};

type EmojiPickerScrollProviderProps = {
  children: ReactNode;
};

type EmojiRow = JSX.Element[];

type CategoryIndices = number[];

export const EmojiPickerScrollContext = createContext(
  {} as EmojiPickerScrollContextType
);

export function EmojiPickerScrollProvider({
  children,
}: EmojiPickerScrollProviderProps) {
  const {
    searchedEmojis: { search },
    searchedEmojis,
  } = useSearchedEmojis();

  const { categories } = useCategories();

  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth ?? 0;

  const { emojiStyles } = useEmojiStyles();

  const emojisPerRow = Math.floor(width / emojiStyles.emojiSize);

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

    if (search) {
      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of searchedEmojis.data) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const { name, emojis } of categories.data) {
      const categoryTitle = <CategoryTitle text={name} />;

      components.push(categoryTitle);

      categoryIndices.push(components.indexOf(categoryTitle));

      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of emojis) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);
    }
  }

  insertEmojisAndInsertCategoryIndices();

  const virtualizer = useVirtual({
    size: components?.length ?? 0,
    parentRef: parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0]?.index;

  const currentCategoryIndex =
    categoryIndices?.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? 999;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices?.[0];

  const currentCategoryPosition = search
    ? 0
    : categoryIndices?.indexOf(currentCategoryIndex);

  return (
    <EmojiPickerScrollContext.Provider
      value={{
        virtualizer,
        currentCategoryPosition,
        parentRef,
        components,
        categoryIndices,
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
