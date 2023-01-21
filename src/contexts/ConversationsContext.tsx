import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getConversations } from 'utils/getConversations';
import { useAuth } from './AuthContext';

export type ConversationType = {
  uid: string;
  photoURL: string | null;
  name: string | undefined;
  username: string | undefined;
  updatedAt: string;
  lastMessage: string;
  isBlocked?: boolean;
};

type Conversations = ConversationType[] | null;

type ConversationsProviderProps = {
  children: ReactNode;
};

type ConversationsContextType = {
  conversations: {
    setConversations: Dispatch<SetStateAction<Conversations>>;
    data: Conversations;
    numberOfConversations: number;
  };
  currentConversation: {
    index: number;
    data: ConversationType | undefined;
    changeCurrentConversationIndex: (index: number) => void;
  };
};

export const ConversationsContext = createContext(
  {} as ConversationsContextType
);

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useState<Conversations>(null);

  const { user } = useAuth();

  useEffect(() => {
    async function fillConversations() {
      if (!user?.uid) return;

      const conversations = await getConversations(user?.uid);

      setConversations(conversations);
    }

    fillConversations();
  }, [user?.uid]);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);

  const numberOfConversations = useMemo(
    () => conversations?.length ?? 0,
    [conversations?.length]
  );

  const changeCurrentConversationIndex = useCallback((index: number) => {
    setCurrentConversationIndex(index);
  }, []);

  const currentConversation = useMemo(
    () => conversations?.[currentConversationIndex],
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
