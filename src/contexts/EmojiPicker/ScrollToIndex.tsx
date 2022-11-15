import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useVirtual } from 'react-virtual';

type ScrollToIndex = ReturnType<typeof useVirtual>['scrollToIndex'] | null;

type ScrollToIndexProviderProps = {
  children: ReactNode;
};

type ScrollToIndexContextType = {
  scrollToIndex: ScrollToIndex;
  setScrollToIndex: Dispatch<SetStateAction<ScrollToIndex>>;
};

export const ScrollToIndexContext = createContext(
  {} as ScrollToIndexContextType
);

export function ScrollToIndexProvider({
  children,
}: ScrollToIndexProviderProps) {
  const [scrollToIndex, setScrollToIndex] = useState<ScrollToIndex>(null);

  return (
    <ScrollToIndexContext.Provider value={{ scrollToIndex, setScrollToIndex }}>
      {children}
    </ScrollToIndexContext.Provider>
  );
}

export function useScrollToIndex() {
  const data = useContext(ScrollToIndexContext);

  return data;
}
