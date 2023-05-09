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
      if (user?.uid === undefined) return;

      const conversations = await getConversations(user?.uid);

      const newConversations: Conversations = [
        ...conversations,
        {
          name: 'Ana',
          lastMessage: 'Tudo bem?',
          photoURL:
            'https://cdn.pixabay.com/photo/2019/12/10/13/31/woman-4685862_960_720.jpg',
          uid: 'a',
          updatedAt: '19:00',
          username: 'Ana#2000',
          isBlocked: false,
        },
        {
          name: 'Lucas',
          lastMessage: 'Ok',
          photoURL:
            'https://cdn.pixabay.com/photo/2016/10/06/05/19/couple-1718244_960_720.jpg',
          uid: 'b',
          updatedAt: '18:00',
          username: 'Lucas#213',
          isBlocked: false,
        },
        {
          name: 'Pedro',
          lastMessage: 'Estarei lá em 10 minutos',
          photoURL:
            'https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_960_720.jpg',
          uid: 'c',
          updatedAt: '17:00',
          username: 'Pedro#99',
          isBlocked: false,
        },
        {
          name: 'Daniel',
          lastMessage: 'Não sei 😓',
          photoURL:
            'https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_960_720.jpg',
          uid: 'd',
          updatedAt: '16:00',
          username: 'Daniel#9843',
          isBlocked: false,
        },
      ];

      setConversations(newConversations);
    }

    fillConversations();
  }, [user, user?.displayName, user?.uid]);

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
