import { createContext, ReactNode, useContext, useState } from 'react';

type ScrollProviderProps = {
  children: ReactNode;
};

type Scrol

type ScrollContextType = {
  scroll
}

export const ScrollContext = createContext({});

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [scrollToIndex, setScrollToIndex] = useState();

  return (
    <ScrollContext.Provider value={{ scrollToIndex, setScrollToIndex }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const data = useContext(ScrollContext);

  return data;
}
