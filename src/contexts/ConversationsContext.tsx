import { createContext, ReactNode, useState } from 'react';

type ConversationsProviderProps = {
  children: ReactNode;
};

export const ConversationsContext = createContext({});

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState([]);

  return (
    <ConversationsContext.Provider value={{}}>
      {children}
    </ConversationsContext.Provider>
  );
}
