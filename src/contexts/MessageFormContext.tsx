import { yupResolver } from '@hookform/resolvers/yup';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type MessageFormProviderProps = {
  children: ReactNode;
};

type MessageFormData = {
  message: string;
};

type MessageInputRef = HTMLTextAreaElement | null;

type MessageFormContextType = {
  messageForm: UseFormReturn<MessageFormData, any>;
  messageInputRef: MutableRefObject<MessageInputRef>;
};

export const MessageFormContext = createContext({} as MessageFormContextType);

const messageFormSchema = yup.object().shape({
  message: yup.string().trim().required(),
});

export function MessageFormProvider({ children }: MessageFormProviderProps) {
  const messageForm = useForm<MessageFormData>({
    resolver: yupResolver(messageFormSchema),
  });

  const messageInputRef = useRef<MessageInputRef>(null);

  return (
    <MessageFormContext.Provider value={{ messageForm, messageInputRef }}>
      {children}
    </MessageFormContext.Provider>
  );
}

export function useMessageForm() {
  const data = useContext(MessageFormContext);

  return data;
}
