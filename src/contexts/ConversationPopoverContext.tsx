import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { UseDisclosure } from '../utils/types';
import { useSearchInConversation } from './SearchInConversationContext';

type ConversationPopoverProviderProps = {
  children: ReactNode;
};

type ConversationPopoverContextType = {
  isOpen: UseDisclosure['isOpen'];
  onClose: UseDisclosure['onClose'];
  onOpen: UseDisclosure['onOpen'];
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
