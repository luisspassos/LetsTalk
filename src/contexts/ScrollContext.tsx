import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { SearchInput } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { CategoryTitle } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';
import { emojiCategories } from '../utils/emojiCategories';
import { useEmoji, Emoji as EmojiType } from './EmojiContext';

type ScrollProviderProps = {
  children: ReactNode;
};

type ScrollContextType = {
  parentRef: RefObject<HTMLDivElement>;
  virtualizer: any;
  components: (JSX.Element | EmojiRow)[];
};

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

type EmojiRow = JSX.Element[];

export const ScrollContext = createContext({} as ScrollContextType);

export function ScrollProvider({ children }: ScrollProviderProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth || 0;

  const {
    emojiPickerStyles,
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const emojisPerRow = Math.floor(width / emojiPickerStyles.emojiSize);

  const components: (JSX.Element | EmojiRow)[] = [
    <SearchInput key='searchInput' />,
  ];

  function insertEmojis() {
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

    if (searchedEmojis) {
      const emojiRows: EmojiRow[] = [[]];

      for (const emoji of searchedEmojis) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const categoryName in emojiCategories) {
      components.push(<CategoryTitle key='category' text={categoryName} />);

      const category = emojiCategories[categoryName];

      const emojiRows: EmojiRow[] = [[]];

      for (const { emoji } of category) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);
    }
  }
  insertEmojis();

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  return (
    <ScrollContext.Provider value={{ virtualizer, components, parentRef }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const data = useContext(ScrollContext);

  return data;
}
