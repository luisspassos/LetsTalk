import { createContext, ReactNode, useContext } from 'react';
import { useVirtual } from 'react-virtual';
import { useEmojiPickerScrollComponents } from './EmojiPickerScrollComponents';
import { useEmojiPickerScrollRef } from './EmojiPickerScrollRef';

type EmojiPickerScrollToIndexProviderProps = {
  children: ReactNode;
};

type ScrollToIndex = ReturnType<typeof useVirtual>['scrollToIndex'];

type EmojiPickerScrollToIndexContextType = {
  scrollToIndex: ScrollToIndex;
};

export const EmojiPickerScrollToIndexContext = createContext(
  {} as EmojiPickerScrollToIndexContextType
);

export function EmojiPickerScrollToIndexProvider({
  children,
}: EmojiPickerScrollToIndexProviderProps) {
  const { parentRef } = useEmojiPickerScrollRef();
  const { components } = useEmojiPickerScrollComponents();

  const { scrollToIndex } = useVirtual({
    parentRef,
    size: components.length,
  });

  return (
    <EmojiPickerScrollToIndexContext.Provider value={{ scrollToIndex }}>
      {children}
    </EmojiPickerScrollToIndexContext.Provider>
  );
}

export function useEmojiPickerScrollToIndex() {
  const data = useContext(EmojiPickerScrollToIndexContext);

  return data;
}
