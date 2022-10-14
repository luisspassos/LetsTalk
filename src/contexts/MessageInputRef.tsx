import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type MessageInputRefProviderProps = {
  children: ReactNode;
};

type MessageInputRefContextType = {
  ref: RefObject<HTMLTextAreaElement>;
};

export const MessageInputRefContext = createContext(
  {} as MessageInputRefContextType
);

export function MessageInputRefProvider({
  children,
}: MessageInputRefProviderProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <MessageInputRefContext.Provider value={{ ref }}>
      {children}
    </MessageInputRefContext.Provider>
  );
}

export function useMessageInputRef() {
  const data = useContext(MessageInputRefContext);

  return data;
}
