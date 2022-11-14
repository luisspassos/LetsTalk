import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AProviderProps = {
  children: ReactNode;
};

type AContextType = {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
};

export const AContext = createContext({} as AContextType);

export function AProvider({ children }: AProviderProps) {
  const [current, setCurrent] = useState(0);

  return (
    <AContext.Provider value={{ current, setCurrent }}>
      {children}
    </AContext.Provider>
  );
}

export function useA() {
  const data = useContext(AContext);

  return data;
}
