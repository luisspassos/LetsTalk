import { createContext, ReactNode, useCallback, useState } from 'react';

type ConversationsProviderProps = {
  children: ReactNode;
};

export const ConversationsContext = createContext({});

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState([]);

  const changeConversationsState = useCallback(() => {
    setConversations();
  }, []);

  return (
    <ConversationsContext.Provider value={{}}>
      {children}
    </ConversationsContext.Provider>
  );
}
