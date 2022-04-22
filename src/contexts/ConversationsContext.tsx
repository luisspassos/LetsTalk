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
  UserConversationsDataType,
} from '../utils/getConversations';

import { useAuth } from './AuthContext';

export type ConversationsType = {
  uid: string;
  photoURL: string | null;
  name: string;
  lastMessage: string;
  updated: number;
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
        changeConversationsState,
        conversations,
        numberOfConversations,
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
