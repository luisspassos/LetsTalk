import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type MessageInputRefProviderProps = {
  children: ReactNode;
};

type MessageInputRefContextType = {
  ref: RefObject<HTMLDivElement>;
  messageInput: HTMLDivElement | null;
};

export const MessageInputRefContext = createContext(
  {} as MessageInputRefContextType
);

export function MessageInputRefProvider({
  children,
}: MessageInputRefProviderProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <MessageInputRefContext.Provider value={{ messageInput: ref.current, ref }}>
      {children}
    </MessageInputRefContext.Provider>
  );
}

export function useMessageInputRef() {
  const data = useContext(MessageInputRefContext);

  return data;
}
