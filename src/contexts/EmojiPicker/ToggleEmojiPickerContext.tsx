import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type ToggleEmojiPickerProviderProps = {
  children: ReactNode;
};

type ToggleEmojiPickerContextType = Pick<
  UseDisclosureReturn,
  'isOpen' | 'onToggle'
>;

export const ToggleEmojiPickerContext = createContext(
  {} as ToggleEmojiPickerContextType
);

export function ToggleEmojiPickerProvider({
  children,
}: ToggleEmojiPickerProviderProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ToggleEmojiPickerContext.Provider value={{ isOpen, onToggle }}>
      {children}
    </ToggleEmojiPickerContext.Provider>
  );
}

export function useToggleEmojiPicker() {
  const data = useContext(ToggleEmojiPickerContext);

  return data;
}
