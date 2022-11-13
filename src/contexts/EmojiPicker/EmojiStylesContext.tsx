import { useBreakpointValue } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type EmojiStyles = {
  emojiSize: number;
  fontSize: number;
};

type EmojiStylesProviderProps = {
  children: ReactNode;
};

type EmojiStylesContextType = {
  emojiStyles: EmojiStyles;
};

export const EmojiStylesContext = createContext({} as EmojiStylesContextType);

export function EmojiStylesProvider({ children }: EmojiStylesProviderProps) {
  const emojiStyles: EmojiStyles = {
    emojiSize: useBreakpointValue([36, 41, 46]) || 0,
    fontSize: useBreakpointValue([22, 25, 28]) || 0,
  };

  return (
    <EmojiStylesContext.Provider value={{ emojiStyles }}>
      {children}
    </EmojiStylesContext.Provider>
  );
}

export function useEmojiStyles() {
  const data = useContext(EmojiStylesContext);

  return data;
}
