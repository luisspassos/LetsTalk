import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type ConversationsTabProviderProps = {
  children: ReactNode;
};

type ConversationsTabContextType = {
  onToggle: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const ConversationsTabContext = createContext(
  {} as ConversationsTabContextType
);

export function ConversationsTabProvider({
  children,
}: ConversationsTabProviderProps) {
  const { onToggle, isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <ConversationsTabContext.Provider value={{ onToggle, isOpen, onClose }}>
      {children}
    </ConversationsTabContext.Provider>
  );
}

export function useConversationsTab() {
  const data = useContext(ConversationsTabContext);

  return data;
}
