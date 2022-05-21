import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ConversationType = {
  uid: string;
  photoURL: string | null;
  name: string;
  username: string;
  updatedAt: string;
  lastMessage: string;
};

export type ConversationsType = ConversationType[];

type ConversationsProviderProps = {
  children: ReactNode;
};

type ConversationsContextType = {
  conversations: {
    setConversations: Dispatch<SetStateAction<ConversationsType>>;
    data: ConversationsType;
    numberOfConversations: number;
  };
  currentConversation: {
    index: number;
    data: ConversationType;
    changeCurrentConversationIndex: (index: number) => void;
  };
};

export const ConversationsContext = createContext(
  {} as ConversationsContextType
);

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState<ConversationsType>([]);
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);

  const numberOfConversations = useMemo(
    () => conversations.length,
    [conversations.length]
  );

  const changeCurrentConversationIndex = useCallback((index: number) => {
    setCurrentConversationIndex(index);
  }, []);

  const currentConversation = useMemo(
    () => conversations[currentConversationIndex],
    [conversations, currentConversationIndex]
  );

  return (
    <ConversationsContext.Provider
      value={{
        conversations: {
          setConversations,
          data: conversations,
          numberOfConversations,
        },
        currentConversation: {
          index: currentConversationIndex,
          data: currentConversation,
          changeCurrentConversationIndex,
        },
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const data = useContext(ConversationsContext);

  return data;
}
