import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type MessageInputRefProviderProps = {
  children: ReactNode;
};

export const MessageInputRefContext = createContext(
  {} as RefObject<HTMLDivElement>
);

export function MessageInputRefProvider({
  children,
}: MessageInputRefProviderProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <MessageInputRefContext.Provider value={ref}>
      {children}
    </MessageInputRefContext.Provider>
  );
}

export function useMessageInputRef() {
  const data = useContext(MessageInputRefContext);

  return data;
}
