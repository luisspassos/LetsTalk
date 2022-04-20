import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

export type ConversationsType = {
  uid: string;
  photoURL: string | null;
  name: string | undefined;
}[];

type ConversationsProviderProps = {
  children: ReactNode;
};

type ConversationsContextType = {
  conversations: ConversationsType;
  changeConversationsState: (conversations: ConversationsType) => void;
};

export const ConversationsContext = createContext(
  {} as ConversationsContextType
);

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState<ConversationsType>([]);

  const changeConversationsState = useCallback(
    (conversations: ConversationsType) => {
      setConversations(conversations);
    },
    []
  );

  return (
    <ConversationsContext.Provider
      value={{ changeConversationsState, conversations }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const data = useContext(ConversationsContext);

  return data;
}
