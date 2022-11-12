import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { emojiCategories } from '../utils/emojiCategories';

type EmojiProviderProps = {
  children: ReactNode;
};

export type Emoji = string;

type Search = string;

type EmojiCategory = typeof emojiCategories[0];

type Category = Omit<EmojiCategory, 'emojis'> & {
  emojis: string[];
};

type EmojiContextType = {
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
  emojiPickerStyles: {
    emojiSize: number;
    fontSize: number;
  };
};

export function formatValue(value: string) {
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

export const EmojiContext = createContext({} as EmojiContextType);

export function EmojiProvider({ children }: EmojiProviderProps) {
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

  const [search, setSearch] = useState('');

  const searchedEmojis = emojis
    .filter(({ name }) => {
      const formattedName = formatValue(name);

      return formattedName.includes(search);
    })
    .map(({ emoji }) => emoji);

  const emojiPickerStyles = {
    emojiSize: useBreakpointValue([36, 41, 46]) || 0,
    fontSize: useBreakpointValue([22, 25, 28]) || 0,
  };

  const { isOpen, onToggle } = useDisclosure();

  return (
    <EmojiContext.Provider
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
        emojiPickerStyles,
      }}
    >
      {children}
    </EmojiContext.Provider>
  );
}

export function useEmoji() {
  const data = useContext(EmojiContext);

  return data;
}
