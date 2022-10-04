import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type MessageInputProviderProps = {
  children: ReactNode;
};

type MessageInputContextType = {
  messageInput: HTMLDivElement | null;
  setMessageInput: Dispatch<SetStateAction<HTMLDivElement | null>>;
};

export const MessageInputContext = createContext({} as MessageInputContextType);

export function MessageInputProvider({ children }: MessageInputProviderProps) {
  const [messageInput, setMessageInput] = useState<HTMLDivElement | null>(null);

  return (
    <MessageInputContext.Provider value={{ messageInput, setMessageInput }}>
      {children}
    </MessageInputContext.Provider>
  );
}

export function useMessageInput() {
  const data = useContext(MessageInputContext);

  return data;
}
