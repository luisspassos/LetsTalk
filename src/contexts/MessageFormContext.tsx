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

type MessageInput = HTMLTextAreaElement | null;

type MessageFormContextType = {
  messageForm: UseFormReturn<MessageFormData, any>;
  MessageInput: MutableRefObject<MessageInput>;
};

export const MessageFormContext = createContext({} as MessageFormContextType);

const messageFormSchema = yup.object().shape({
  message: yup.string().trim().required(),
});

export function MessageFormProvider({ children }: MessageFormProviderProps) {
  const messageForm = useForm<MessageFormData>({
    resolver: yupResolver(messageFormSchema),
  });

  const MessageInput = useRef<MessageInput>(null);

  return (
    <MessageFormContext.Provider value={{ messageForm, MessageInput }}>
      {children}
    </MessageFormContext.Provider>
  );
}

export function useMessageForm() {
  const data = useContext(MessageFormContext);

  return data;
}
