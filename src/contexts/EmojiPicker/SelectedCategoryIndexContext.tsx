import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

type SelectedCategoryIndex = null | number;

type SelectedCategoryIndexProviderProps = {
  children: ReactNode;
};

type SelectedCategoryIndexContextType = {
  selectedCategoryIndex: MutableRefObject<SelectedCategoryIndex>;
};

export const SelectedCategoryIndexContext = createContext(
  {} as SelectedCategoryIndexContextType
);

export function SelectedCategoryIndexProvider({
  children,
}: SelectedCategoryIndexProviderProps) {
  // its used when there is search

  const selectedCategoryIndex = useRef<SelectedCategoryIndex>(null);

  return (
    <SelectedCategoryIndexContext.Provider
      value={{
        selectedCategoryIndex,
      }}
    >
      {children}
    </SelectedCategoryIndexContext.Provider>
  );
}

export function useSelectedCategoryIndex() {
  const data = useContext(SelectedCategoryIndexContext);

  return data;
}
