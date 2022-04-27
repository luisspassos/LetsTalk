import { doc, onSnapshot } from 'firebase/firestore';
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
import {
  getConversations,
  MessagesType,
  UserConversationsDataType,
} from '../utils/getConversations';

import { useAuth } from './AuthContext';

type ConversationType = {
  uid: string;
  photoURL: string | null;
  name: string;
  lastMessage: string;
  updatedAt: number;
  updatedAtFormatted: string;
  messages: MessagesType | null;
  unreadMessages: number;
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
      let ignoreOnSnapshot = true;

      const unsub = onSnapshot(
        doc(db, 'conversations', user.username),
        (userConversationsDoc) => {
          if (ignoreOnSnapshot) {
            ignoreOnSnapshot = false;
          } else {
            const updateConversations = async (
              userConversationsDocData: UserConversationsDataType
            ) => {
              const conversations = await getConversations(
                userConversationsDocData
              );

              setConversations(conversations);
            };

            const userConversationsDocData =
              userConversationsDoc.data() as UserConversationsDataType;

            updateConversations(userConversationsDocData);
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
