import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { emojiCategories } from '../../utils/emojiCategories';
import { Emoji } from './CategoriesContext';

type Search = string;

type SearchedEmojisProviderProps = {
  children: ReactNode;
};

type SearchedEmojisContextType = {
  searchedEmojis: {
    data: Emoji[];
    setSearch: Dispatch<SetStateAction<Search>>;
    search: Search;
  };
};

export function formatValueForSearch(value: string) {
  // remove accents
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  value = value.toLowerCase().trim();

  return value;
}

const emojis = emojiCategories.flatMap(({ emojis }) => emojis);

export const SearchedEmojisContext = createContext(
  {} as SearchedEmojisContextType
);

export function SearchedEmojisProvider({
  children,
}: SearchedEmojisProviderProps) {
  const [search, setSearch] = useState<Search>('');

  const searchedEmojis = emojis
    .filter(({ name }) => {
      const formattedName = formatValueForSearch(name);
      const formattedSearch = formatValueForSearch(search);

      return formattedName.includes(formattedSearch);
    })
    .map(({ emoji }) => emoji);

  return (
    <SearchedEmojisContext.Provider
      value={{
        searchedEmojis: {
          data: searchedEmojis,
          setSearch,
          search,
        },
      }}
    >
      {children}
    </SearchedEmojisContext.Provider>
  );
}

export function useSearchedEmojis() {
  const data = useContext(SearchedEmojisContext);

  return data;
}
