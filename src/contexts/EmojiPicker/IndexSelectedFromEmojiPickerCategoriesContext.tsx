import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

type SelectedCategoryIndex = null | number;

type IndexSelectedFromEmojiPickerCategoriesProviderProps = {
  children: ReactNode;
};

type IndexSelectedFromEmojiPickerCategoriesContextType = {
  selectedCategoryIndex: MutableRefObject<SelectedCategoryIndex>;
};

export const IndexSelectedFromEmojiPickerCategoriesContext = createContext(
  {} as IndexSelectedFromEmojiPickerCategoriesContextType
);

export function IndexSelectedFromEmojiPickerCategoriesProvider({
  children,
}: IndexSelectedFromEmojiPickerCategoriesProviderProps) {
  // its used when there is search
  const selectedCategoryIndex = useRef<SelectedCategoryIndex>(null);

  return (
    <IndexSelectedFromEmojiPickerCategoriesContext.Provider
      value={{
        selectedCategoryIndex,
      }}
    >
      {children}
    </IndexSelectedFromEmojiPickerCategoriesContext.Provider>
  );
}

export function useIndexSelectedFromEmojiPickerCategories() {
  const data = useContext(IndexSelectedFromEmojiPickerCategoriesContext);

  return data;
}
