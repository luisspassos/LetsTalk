import { createContext, createRef, ReactNode, useContext } from 'react';

type EmojiPickerScrollRefProviderProps = {
  children: ReactNode;
};

type EmojiPickerScrollRefContextType = {};

export const EmojiPickerScrollRefContext = createContext(
  {} as EmojiPickerScrollRefContextType
);

const ref = createRef();

export function EmojiPickerScrollRefProvider({
  children,
}: EmojiPickerScrollRefProviderProps) {
  return (
    <EmojiPickerScrollRefContext.Provider value={{}}>
      {children}
    </EmojiPickerScrollRefContext.Provider>
  );
}

export function useEmojiPickerScrollRef() {
  const data = useContext(EmojiPickerScrollRefContext);

  return data;
}
