import { Flex, FormControl } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { MessageInput } from './MessageInput';
import { EmojiPicker } from './MessageInput/EmojiButton/EmojiPicker';
import { RecordButtonAudio } from './Buttons/RecordButtonAudio';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageFormData } from '../../../../utils/types';
import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SendMessageButton } from './Buttons/SendMessageButton';

export type HandleSendMessage = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export type MessageInputRef = HTMLTextAreaElement | null;

export type HandleMessageInputSize = () => Promise<void>;

const messageFormSchema = yup.object().shape({
  message: yup.string().trim().required(),
});

export function Footer() {
  const [thereIsNoMessage, setThereIsNoMessage] = useState(true);

  const { register, handleSubmit, reset, watch } = useForm<MessageFormData>({
    resolver: yupResolver(messageFormSchema),
  });

  const messageInputRef = useRef<MessageInputRef>(null);

  useEffect(() => {
    function verifyIfThereIsNoMessage() {
      const { unsubscribe } = watch(({ message }) => {
        if (!message) {
          setThereIsNoMessage(true);
        } else {
          setThereIsNoMessage(false);
        }
      });

      return () => unsubscribe();
    }

    const unsub = verifyIfThereIsNoMessage();

    return () => unsub();
  }, [watch]);

  const handleMessageInputSize = useCallback(async () => {
    if (messageInputRef.current?.style) {
      messageInputRef.current.style.height = 'inherit';

      const scrollHeight = messageInputRef.current.scrollHeight;
      const { messageInputInitialHeight } = await import(
        './MessageInput/index'
      );
      const textAreaHeight = Math.min(
        Math.max(scrollHeight, messageInputInitialHeight),
        199
      );

      messageInputRef.current.style.height = `${textAreaHeight}px`;
      messageInputRef.current.scrollTop = scrollHeight;

      if (scrollHeight > 199) {
        messageInputRef.current.style.overflowY = 'visible';
      } else {
        messageInputRef.current.style.overflowY = 'hidden';
      }
    }
  }, []);

  const handleSendMessage = useMemo(
    () =>
      handleSubmit(async () => {
        console.log('message sent');
        reset();
      }),
    [handleSubmit, reset]
  );

  return (
    <FormControl as='form' mt='auto'>
      <EmojiPicker />
      <Divider />
      <Flex
        as='footer'
        py={['11px', '13px', '15px']}
        minH={['50px', '65px', '80px']}
        align='center'
        justify='start'
        pl={['6px', '8px', '10px']}
        pos='relative'
      >
        <MessageInput
          handleSendMessage={handleSendMessage}
          handleMessageInputSize={handleMessageInputSize}
          register={register}
          messageInputRef={messageInputRef}
        />
        {thereIsNoMessage ? (
          <RecordButtonAudio />
        ) : (
          <SendMessageButton
            handleSendMessage={handleSendMessage}
            handleMessageInputSize={handleMessageInputSize}
          />
        )}
      </Flex>
    </FormControl>
  );
}
