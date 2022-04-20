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
import { ConversationsIdType } from '../utils/formatConversations';
import { useAuth } from './AuthContext';

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
      let initState = true;

      const unsub = onSnapshot(
        doc(db, 'conversations', user.username),
        (doc) => {
          if (initState) {
            initState = false;
          } else {
            const updateConversations = async (
              conversationsId: ConversationsIdType
            ) => {
              const { formatConversations } = await import(
                '../utils/formatConversations'
              );

              const conversationsFormatted = await formatConversations(
                conversationsId
              );

              setConversations(conversationsFormatted);
            };

            const conversationsId = doc.data()
              ?.conversationsId as ConversationsIdType;

            updateConversations(conversationsId);
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
