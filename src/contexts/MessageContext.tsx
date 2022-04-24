import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useConversations } from './ConversationsContext';

type MessageProviderProps = {
  children: ReactNode;
};

type MessageDataType = {
  photoURL: string | null;
  name: string;
};

type MessageContextType = {
  messageData: MessageDataType | undefined;
  changeMessageDataState: (messageData: MessageDataType) => void;
};

export const MessageContext = createContext({} as MessageContextType);

export function MessageProvider({ children }: MessageProviderProps) {
  const [messageData, setMessageData] = useState<MessageDataType>();

  const { conversations } = useConversations();

  const changeMessageDataState = useCallback((messageData: MessageDataType) => {
    setMessageData(messageData);
  }, []);

  useEffect(() => {
    const [lastConversation] = conversations;

    setMessageData({
      photoURL: lastConversation?.photoURL,
      name: lastConversation?.name,
    });
  }, [conversations]);

  return (
    <MessageContext.Provider value={{ messageData, changeMessageDataState }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const data = useContext(MessageContext);

  return data;
}
