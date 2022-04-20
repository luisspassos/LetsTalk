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
  name: string;
}[];

type ConversationsProviderProps = {
  children: ReactNode;
};

type ConversationsContextType = {
  conversations: ConversationsType;
  changeConversationsState: (conversations: ConversationsType) => void;
  numberOfConversations: number;
};

export const ConversationsContext = createContext(
  {} as ConversationsContextType
);

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState<ConversationsType>([]);

  const numberOfConversations = conversations.length;

  const changeConversationsState = useCallback(
    (conversations: ConversationsType) => {
      setConversations(conversations);
    },
    []
  );

  return (
    <ConversationsContext.Provider
      value={{ changeConversationsState, conversations, numberOfConversations }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const data = useContext(ConversationsContext);

  return data;
}
