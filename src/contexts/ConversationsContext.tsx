import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { db } from '../services/firebase';
import { getConversations } from '../utils/getConversations';

import { useAuth } from './AuthContext';

type ConversationType = {
  uid: string;
  photoURL: string | null;
  name: string;
};

export type ConversationsType = ConversationType[];

type ConversationsProviderProps = {
  children: ReactNode;
};

type ConversationsContextType = {
  conversations: {
    changeConversationsState: (conversations: ConversationsType) => void;
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

  const { user } = useAuth();

  const numberOfConversations = useMemo(
    () => conversations.length,
    [conversations.length]
  );

  const changeConversationsState = useCallback(
    (conversations: ConversationsType) => {
      setConversations(conversations);
    },
    []
  );

  const changeCurrentConversationIndex = useCallback((index: number) => {
    setCurrentConversationIndex(index);
  }, []);

  const currentConversation = useMemo(
    () => conversations[currentConversationIndex],
    [conversations, currentConversationIndex]
  );

  // update conversation list
  useEffect(() => {
    if (user) {
      let ignoreInitialOnSnapshot = true;

      const unsub = onSnapshot(
        query(
          collection(db, 'conversations'),
          where('users', 'array-contains', user.uid)
        ),
        async (userConversationsDoc) => {
          if (ignoreInitialOnSnapshot) {
            ignoreInitialOnSnapshot = false;
          } else {
            const conversations = await getConversations(user.uid);

            console.log(conversations);
          }
        }
      );

      return () => {
        unsub();
      };
    }
  }, [user]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: {
          changeConversationsState,
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
