import { createContext, ReactNode, useContext } from 'react';
import { useVirtual } from 'react-virtual';
import { useEmojiPickerScrollComponents } from './EmojiPickerScrollComponents';
import { useEmojiPickerScrollRef } from './EmojiPickerScrollRef';
import { useSearchedEmojis } from './SearchedEmojiContext';

type EmojiPickerScrollProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollContextType = {
  virtualizer: ReturnType<typeof useVirtual>;
  currentCategoryPosition: number;
};

export const EmojiPickerScrollContext = createContext(
  {} as EmojiPickerScrollContextType
);

export function EmojiPickerScrollProvider({
  children,
}: EmojiPickerScrollProviderProps) {
  const {
    searchedEmojis: { search },
  } = useSearchedEmojis();

  const { components, categoryIndices } = useEmojiPickerScrollComponents();

  const { parentRef } = useEmojiPickerScrollRef();

  const virtualizer = useVirtual({
    size: components.length,
    parentRef,
    paddingEnd: 10,
    overscan: 0,
  });

  const currentIndex = virtualizer.virtualItems[0]?.index;

  const currentCategoryIndex =
    categoryIndices?.find((categoryIndex, i) => {
      const nextCategoryIndex = categoryIndices[i + 1] ?? Infinity;

      return currentIndex >= categoryIndex && currentIndex < nextCategoryIndex;
    }) ?? categoryIndices?.[0];

  const currentCategoryPosition = search
    ? 0
    : categoryIndices?.indexOf(currentCategoryIndex);

  return (
    <EmojiPickerScrollContext.Provider
      value={{
        virtualizer,
        currentCategoryPosition,
      }}
    >
      {children}
    </EmojiPickerScrollContext.Provider>
  );
}

export function useEmojiPickerScroll() {
  const data = useContext(EmojiPickerScrollContext);

  return data;
}
