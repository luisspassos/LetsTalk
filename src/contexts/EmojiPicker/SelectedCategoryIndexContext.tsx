import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SelectedCategoryIndex = null | number;

type SelectedCategoryIndexProviderProps = {
  children: ReactNode;
};

type SelectedCategoryIndexContextType = {
  selectedCategoryIndex: SelectedCategoryIndex;
  setSelectedCategoryIndex: Dispatch<SetStateAction<SelectedCategoryIndex>>;
};

export const SelectedCategoryIndexContext = createContext(
  {} as SelectedCategoryIndexContextType
);

export function SelectedCategoryIndexProvider({
  children,
}: SelectedCategoryIndexProviderProps) {
  // its used when there is search
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState<SelectedCategoryIndex>(null);

  return (
    <SelectedCategoryIndexContext.Provider
      value={{
        selectedCategoryIndex,
        setSelectedCategoryIndex,
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
