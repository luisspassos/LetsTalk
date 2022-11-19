import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type EmojiPickerScrollRefProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollRefContextType = {
  parentRef: RefObject<HTMLDivElement>;
};

export const EmojiPickerScrollRefContext = createContext(
  {} as EmojiPickerScrollRefContextType
);

export function EmojiPickerScrollRefProvider({
  children,
}: EmojiPickerScrollRefProviderProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <EmojiPickerScrollRefContext.Provider value={{ parentRef }}>
      {children}
    </EmojiPickerScrollRefContext.Provider>
  );
}

export function useEmojiPickerScrollRef() {
  const data = useContext(EmojiPickerScrollRefContext);

  return data;
}
