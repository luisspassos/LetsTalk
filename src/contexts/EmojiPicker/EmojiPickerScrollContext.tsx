import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useVirtual } from 'react-virtual';
import { SearchInput } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { CategoryTitle } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';
import { useCategories, Emoji as EmojiType } from './CategoriesContext';
import { useEmojiStyles } from './EmojiStylesContext';
import { useSearchedEmojis } from './SearchedEmojiContext';

type EmojiRow = JSX.Element[];

type Components = (JSX.Element | EmojiRow)[];

type CategoryIndicies = number[];

type ParentRef = { current: HTMLDivElement | null };

type EmojiPickerScrollProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollContextType = {
  virtualizer: ReturnType<typeof useVirtual>;
  setParentRef: Dispatch<SetStateAction<ParentRef>>;
  parentRef: ParentRef;
  components: Components;
  categoryIndices: CategoryIndicies;
  currentCategoryPosition: number;
};

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

  const { emojiStyles } = useEmojiStyles();

  const [parentRef, setParentRef] = useState<ParentRef>({ current: null });

  const width = parentRef.current?.clientWidth ?? 0;

  const emojisPerRow = Math.floor(width / emojiStyles.emojiSize);

  const { categoryIndices, components } = useMemo(() => {
    const components: Components = [<SearchInput key='searchInput' />];
    const categoryIndices: CategoryIndicies = [];

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

    return { components, categoryIndices };
  }, [categories.data, emojisPerRow, search, searchedEmojis.data]);

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0]?.index;

  const currentCategoryIndex =
    categoryIndices?.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? Infinity;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices?.[0];

  const currentCategoryPosition = search
    ? 0
    : categoryIndices?.indexOf(currentCategoryIndex);

  return (
    <EmojiPickerScrollContext.Provider
      value={{
        virtualizer,
        parentRef,
        setParentRef,
        components,
        categoryIndices,
        currentCategoryPosition,
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
