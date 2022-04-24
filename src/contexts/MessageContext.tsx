import { createContext, ReactNode, useState } from 'react';

type MessageProviderProps = {
  children: ReactNode;
};

type MessageDataType = {
  photoURL: string | null;
};

export const MessageContext = createContext({});

export function MessageProvider({ children }: MessageProviderProps) {
  const [messageData, setMessageData] = useState({});

  return (
    <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>
  );
}
