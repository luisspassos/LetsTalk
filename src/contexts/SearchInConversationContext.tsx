import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type SearchInConversationProviderProps = {
  children: ReactNode;
};

type SearchInConversationContextType = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export const SearchInConversationContext = createContext(
  {} as SearchInConversationContextType
);

export function SearchInConversationProvider({
  children,
}: SearchInConversationProviderProps) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSearchText(searchText.trim().toLowerCase());
  }, [searchText]);

  return (
    <SearchInConversationContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchInConversationContext.Provider>
  );
}

export function useSearchInConversation() {
  const data = useContext(SearchInConversationContext);

  return data;
}
