import { Box, Flex, FormControl } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { MessageInput } from './MessageInput';
import { EmojiPicker } from './MessageInput/EmojiButton/EmojiPicker';
import { RecordButtonAudio } from './Buttons/RecordButtonAudio';
import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SendMessageButton } from './Buttons/SendMessageButton';
import { useMessageForm } from '../../../../contexts/MessageFormContext';

export type HandleSendMessage = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export type HandleMessageInputSize = () => Promise<void>;

export function Footer() {
  const [thereIsNoMessage, setThereIsNoMessage] = useState(true);

  const {
    messageForm: { handleSubmit, reset: resetForm, watch: watchForm },
    messageInputRef,
  } = useMessageForm();

  useEffect(() => {
    function verifyIfThereIsNoMessage() {
      const { unsubscribe } = watchForm(({ message }) => {
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
  }, [watchForm]);

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
  }, [messageInputRef]);

  const handleSendMessage = useMemo(
    () =>
      handleSubmit(async () => {
        console.log('message sent');
        resetForm();
      }),
    [handleSubmit, resetForm]
  );

  return (
    <Box display='inline-block' as='footer'>
      <FormControl as='form' mt='auto'>
        <EmojiPicker />
        <Divider />
        <Flex
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
    </Box>
  );
}
