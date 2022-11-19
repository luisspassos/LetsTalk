import { createContext, ReactNode, useContext } from 'react';
import { CategoryTitle } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';
import { SearchInput } from '../../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { useCategories, Emoji as EmojiType } from './CategoriesContext';
import { useEmojiPickerScrollRef } from './EmojiPickerScrollRef';
import { useEmojiStyles } from './EmojiStylesContext';
import { useSearchedEmojis } from './SearchedEmojiContext';

type CategoryIndicies = number[];

type EmojiRow = JSX.Element[];

type Components = (JSX.Element | EmojiRow)[];

type EmojiPickerScrollComponentsProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollComponentsContextType = {
  components: Components;
  categoryIndices: CategoryIndicies;
};

export const EmojiPickerScrollComponentsContext = createContext(
  {} as EmojiPickerScrollComponentsContextType
);

export function EmojiPickerScrollComponentsProvider({
  children,
}: EmojiPickerScrollComponentsProviderProps) {
  const { categories } = useCategories();

  const { emojiStyles } = useEmojiStyles();

  const { parentRef } = useEmojiPickerScrollRef();

  const {
    searchedEmojis: { search },
    searchedEmojis,
  } = useSearchedEmojis();

  const width = parentRef.current?.clientWidth ?? 0;

  const emojisPerRow = Math.floor(width / emojiStyles.emojiSize);

  const components: Components = [<SearchInput key='searchInput' />];
  const categoryIndices: CategoryIndicies = [];

  console.log(components);

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

  return (
    <EmojiPickerScrollComponentsContext.Provider
      value={{ components, categoryIndices }}
    >
      {children}
    </EmojiPickerScrollComponentsContext.Provider>
  );
}

export function useEmojiPickerScrollComponents() {
  const data = useContext(EmojiPickerScrollComponentsContext);

  return data;
}
