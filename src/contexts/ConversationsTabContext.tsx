import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type ConversationsTabProviderProps = {
  children: ReactNode;
};

type ConversationsTabContextType = {
  onToggle: () => void;
  isOpen: boolean;
};

export const ConversationsTabContext = createContext(
  {} as ConversationsTabContextType
);

export function ConversationsTabProvider({
  children,
}: ConversationsTabProviderProps) {
  const { onToggle, isOpen } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <ConversationsTabContext.Provider value={{ onToggle, isOpen }}>
      {children}
    </ConversationsTabContext.Provider>
  );
}

export function useConversationsTab() {
  const data = useContext(ConversationsTabContext);

  return data;
}
