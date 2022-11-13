import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useVirtual } from 'react-virtual';
import { SearchInput } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/SearchInput';
import { CategoryTitle } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/CategoryTitle';
import { Emoji } from '../components/Conversations/Messages/Footer/IconButtons/EmojiButton/EmojiPicker/Scroll/Emoji';

import { emojiCategories } from '../utils/emojiCategories';

export type Emoji = string;

type EmojiRow = JSX.Element[];

type EmojiCategory = typeof emojiCategories[0];

type Category = Omit<EmojiCategory, 'emojis'> & {
  emojis: Emoji[];
};

type EmojiStyles = {
  emojiSize: number;
  fontSize: number;
};

type Search = string;

type SelectedCategoryIndex = null | number;

type CategoryIndices = number[];

type EmojiPickerContextType = {
  categories: {
    data: Category[];
    set: Dispatch<SetStateAction<Category[]>>;
  };
  searchedEmojis: {
    data: Emoji[];
    search: Search;
    setSearch: Dispatch<SetStateAction<Search>>;
  };
  togglePicker: {
    isOpen: boolean;
    onToggle: () => void;
  };
  scroll: {
    parentRef: RefObject<HTMLDivElement>;
    virtualizer: ReturnType<typeof useVirtual>;
    components: (JSX.Element | EmojiRow)[];
    categoryIndices: CategoryIndices;
    emojiStyles: EmojiStyles;
    currentCategoryPosition: number;
    selectedCategoryIndex: {
      data: SelectedCategoryIndex;
      set: Dispatch<SetStateAction<SelectedCategoryIndex>>;
    };
  };
};

type EmojiPickerProviderProps = {
  children: ReactNode;
};

export function formatValueForSearch(value: string) {
  // remove accents
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  value = value.toLowerCase().trim();

  return value;
}

const emojis = emojiCategories.flatMap(({ emojis }) => emojis);

export const createRecentCategory = (emojis: Emoji[] = []) => ({
  name: 'Recentes',
  icon: AiOutlineClockCircle,
  emojis,
});

export const EmojiPickerContext = createContext({} as EmojiPickerContextType);

export function EmojiPickerProvider({ children }: EmojiPickerProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    function fillCategories() {
      const newCategories = emojiCategories.map(({ emojis, ...rest }) => ({
        ...rest,
        emojis: emojis.map(({ emoji }) => emoji),
      }));

      function addRecentCategory() {
        const localStorageData = localStorage.getItem('recentlyUsedEmojis');

        if (!localStorageData) return;

        const emojis: Emoji[] = JSON.parse(localStorageData);

        const category = createRecentCategory(emojis);

        newCategories.unshift(category);
      }

      addRecentCategory();

      setCategories(newCategories);
    }

    fillCategories();
  }, []);

  const [search, setSearch] = useState<Search>('');

  const searchedEmojis = emojis
    .filter(({ name }) => {
      const formattedName = formatValueForSearch(name);

      return formattedName.includes(search);
    })
    .map(({ emoji }) => emoji);

  const { isOpen, onToggle } = useDisclosure();

  const emojiStyles = {
    emojiSize: useBreakpointValue([36, 41, 46]) || 0,
    fontSize: useBreakpointValue([22, 25, 28]) || 0,
  };

  // its used when there is search
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState<SelectedCategoryIndex>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  const width = parentRef.current?.clientWidth || 0;

  const emojisPerRow = Math.floor(width / emojiStyles.emojiSize);

  const components: (JSX.Element | EmojiRow)[] = [
    <SearchInput key='searchInput' />,
  ];

  const categoryIndices: CategoryIndices = [];

  function insertEmojisAndInsertCategoryIndices() {
    function fillEmojiRows(emoji: Emoji, rows: EmojiRow[]) {
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

      for (const emoji of searchedEmojis) {
        fillEmojiRows(emoji, emojiRows);
      }

      fillComponents(emojiRows);

      return;
    }

    for (const { name, emojis } of categories) {
      const categoryTitle = <CategoryTitle key='category' text={name} />;

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
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0].index;

  const currentCategoryIndex =
    categoryIndices.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? 999;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices[0];

  const currentCategoryPosition = search
    ? 0
    : categoryIndices.indexOf(currentCategoryIndex);

  return (
    <EmojiPickerContext.Provider
      value={{
        searchedEmojis: {
          data: searchedEmojis,
          search,
          setSearch,
        },
        categories: {
          data: categories,
          set: setCategories,
        },
        togglePicker: {
          isOpen,
          onToggle,
        },
        scroll: {
          virtualizer,
          components,
          parentRef,
          emojiStyles,
          categoryIndices,
          currentCategoryPosition,
          selectedCategoryIndex: {
            data: selectedCategoryIndex,
            set: setSelectedCategoryIndex,
          },
        },
      }}
    >
      {children}
    </EmojiPickerContext.Provider>
  );
}

export function useEmojiPicker() {
  const data = useContext(EmojiPickerContext);

  return data;
}
