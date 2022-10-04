import { Box, Flex, FormControl, HStack } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { EmojiPicker } from './IconButtons/EmojiButton/EmojiPicker';
import { RecordButtonAudio } from './Buttons/RecordButtonAudio';
import { BaseSyntheticEvent, useState } from 'react';
import { SendMessageButton } from './Buttons/SendMessageButton';
import { EmojiButton } from './IconButtons/EmojiButton';
import { FileButton } from './IconButtons/FileButton';
import { ButtonWrapper } from './ButtonWrapper';
import { MessageInput } from './MessageInput';

export type HandleSendMessage = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export type HandleMessageInputSize = () => Promise<void>;

export function Footer() {
  const [thereIsNoMessage, setThereIsNoMessage] = useState(true);

  // const {
  //   messageForm: { handleSubmit, reset: resetForm, watch: watchForm },
  //   MessageInput,
  // } = useMessageForm();

  // useEffect(() => {
  //   function verifyIfThereIsNoMessage() {
  //     const { unsubscribe } = watchForm(({ message }) => {
  //       if (!message) {
  //         setThereIsNoMessage(true);
  //       } else {
  //         setThereIsNoMessage(false);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }

  //   const unsub = verifyIfThereIsNoMessage();

  //   return () => unsub();
  // }, [watchForm]);

  // const handleMessageInputSize = useCallback(async () => {
  //   if (MessageInput.current?.style) {
  //     MessageInput.current.style.height = 'inherit';

  //     const scrollHeight = MessageInput.current.scrollHeight;
  //     // const { messageInputInitialHeight } = await import(
  //     //   './MessageInput/index'
  //     // );
  //     // const textAreaHeight = Math.min(
  //     //   Math.max(scrollHeight, messageInputInitialHeight),
  //     //   199
  //     // );

  //     // MessageInput.current.style.height = `${textAreaHeight}px`;
  //     MessageInput.current.scrollTop = scrollHeight;

  //     if (scrollHeight > 199) {
  //       MessageInput.current.style.overflowY = 'visible';
  //     } else {
  //       MessageInput.current.style.overflowY = 'hidden';
  //     }
  //   }
  // }, [MessageInput]);

  // const handleSendMessage = useMemo(
  //   () =>
  //     handleSubmit(async () => {
  //       console.log('message sent');
  //       resetForm();
  //     }),
  //   [handleSubmit, resetForm]
  // );

  return (
    <Box display='inline-block' as='footer'>
      <FormControl as='form' mt='auto'>
        <EmojiPicker />
        <Divider />
        <Flex py='15px' align='end' justify='start' pos='relative'>
          <ButtonWrapper>
            <HStack mr='10px' spacing='5px'>
              <EmojiButton />
              <FileButton />
            </HStack>
          </ButtonWrapper>
          <MessageInput
          // handleSendMessage={handleSendMessage}
          // handleMessageInputSize={handleMessageInputSize}
          />
          {thereIsNoMessage ? (
            <RecordButtonAudio />
          ) : (
            <SendMessageButton
            // handleSendMessage={handleSendMessage}
            // handleMessageInputSize={handleMessageInputSize}
            />
          )}
        </Flex>
      </FormControl>
    </Box>
  );
}
