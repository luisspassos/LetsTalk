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
import { api } from '../services/api';
import { db } from '../services/firebase';
import {
  ContactsResponse,
  ConversationUsersId,
} from '../utils/getConversations';

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
            const conversationUsersId = userConversationsDoc
              .docChanges()[0]
              .doc.data().users as ConversationUsersId;

            const contactId = conversationUsersId.find((id) => id !== user.uid);

            const contactData = (
              await api.get<ContactsResponse>(`getUsers?usersId=${contactId}`)
            ).data.users[0];

            const conversation = {
              name: contactData.displayName.split('#')[0],
              photoURL: contactData.photoURL ?? null,
              uid: contactData.uid,
            };

            setConversations((prevState) => [conversation, ...prevState]);
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
