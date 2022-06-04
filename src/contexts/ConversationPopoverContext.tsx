import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useSearchInConversation } from './SearchInConversationContext';

type ConversationPopoverProviderProps = {
  children: ReactNode;
};

type ConversationPopoverContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ConversationPopoverContext = createContext(
  {} as ConversationPopoverContextType
);

export function ConversationPopoverProvider({
  children,
}: ConversationPopoverProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { setSearchText } = useSearchInConversation();

  const newOnClose = useCallback(() => {
    setSearchText('');
    onClose();
  }, [onClose, setSearchText]);

  return (
    <ConversationPopoverContext.Provider
      value={{ isOpen, onClose: newOnClose, onOpen }}
    >
      {children}
    </ConversationPopoverContext.Provider>
  );
}

export function useConversationPopover() {
  const data = useContext(ConversationPopoverContext);

  return data;
}
