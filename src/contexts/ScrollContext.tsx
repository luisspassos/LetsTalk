import { createContext, ReactNode, useContext } from 'react';
import { useVirtual } from 'react-virtual';

type ScrollProviderProps = {
  children: ReactNode;
};

export const ScrollContext = createContext({});

export function ScrollProvider({ children }: ScrollProviderProps) {
  const virtualizer = useVirtual;

  virtualizer.return(
    <ScrollContext.Provider value={{ scrollToIndex, setScrollToIndex }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const data = useContext(ScrollContext);

  return data;
}
