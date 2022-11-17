import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type EmojiPickerScrollRefProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollRefContextType = {
  ref: RefObject<HTMLDivElement>;
};

export const EmojiPickerScrollRefContext = createContext(
  {} as EmojiPickerScrollRefContextType
);

export function EmojiPickerScrollRefProvider({
  children,
}: EmojiPickerScrollRefProviderProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <EmojiPickerScrollRefContext.Provider value={{ ref }}>
      {children}
    </EmojiPickerScrollRefContext.Provider>
  );
}

export function useEmojiPickerScrollRef() {
  const data = useContext(EmojiPickerScrollRefContext);

  return data;
}
