import { createContext, useContext } from 'react';

export const ScrollContext = createContext({});

export function ScrollProvider() {
  return <ScrollContext.Provider></ScrollContext.Provider>;
}

export function useScroll() {
  const data = useContext(ScrollContext);

  return data;
}
