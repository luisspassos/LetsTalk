import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

type SelectedCategoryPosition = null | number;

type PositionSelectedFromEmojiPickerCategoriesProviderProps = {
  children: ReactNode;
};

type PositionSelectedFromEmojiPickerCategoriesContextType = {
  selectedCategoryPosition: MutableRefObject<SelectedCategoryPosition>;
};

export const PositionSelectedFromEmojiPickerCategoriesContext = createContext(
  {} as PositionSelectedFromEmojiPickerCategoriesContextType
);

export function PositionSelectedFromEmojiPickerCategoriesProvider({
  children,
}: PositionSelectedFromEmojiPickerCategoriesProviderProps) {
  // its used when there is search
  const selectedCategoryPosition = useRef<SelectedCategoryPosition>(null);

  return (
    <PositionSelectedFromEmojiPickerCategoriesContext.Provider
      value={{
        selectedCategoryPosition,
      }}
    >
      {children}
    </PositionSelectedFromEmojiPickerCategoriesContext.Provider>
  );
}

export function usePositionSelectedFromEmojiPickerCategories() {
  const data = useContext(PositionSelectedFromEmojiPickerCategoriesContext);

  return data;
}
