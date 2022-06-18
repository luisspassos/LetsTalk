import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { EmojiType } from '../types';

type SearchedEmojisProviderProps = {
  children: ReactNode;
};

type SearchedEmojis = {
  data: EmojiType[];
  isEmpty: boolean;
};

type SearchedEmojisContextType = {
  searchedEmojis: SearchedEmojis;
  setSearchedEmojis: Dispatch<SetStateAction<SearchedEmojis>>;
};

export const SearchedEmojisContext = createContext(
  {} as SearchedEmojisContextType
);

export function SearchedEmojisProvider({
  children,
}: SearchedEmojisProviderProps) {
  const [searchedEmojis, setSearchedEmojis] = useState<SearchedEmojis>({
    data: [],
    isEmpty: true,
  });

  return (
    <SearchedEmojisContext.Provider
      value={{ searchedEmojis, setSearchedEmojis }}
    >
      {children}
    </SearchedEmojisContext.Provider>
  );
}

export function useSearchedEmojis() {
  const data = useContext(SearchedEmojisContext);

  return data;
}
