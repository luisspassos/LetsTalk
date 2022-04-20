import { createContext, ReactNode, useContext, useState } from 'react';

type LoadingProviderProps = {
  children: ReactNode;
};

type LoadingContextType = {
  isActive: boolean;
  changeLoadingState: (boolean: boolean) => void;
};

export const LoadingContext = createContext({} as LoadingContextType);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isActive, setIsActive] = useState(true);

  function changeLoadingState(boolean: boolean) {
    setIsActive(boolean);
  }

  return (
    <LoadingContext.Provider value={{ isActive, changeLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const data = useContext(LoadingContext);

  return data;
}
