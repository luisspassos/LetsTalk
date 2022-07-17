import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';
import { HandleMessageInputSize, HandleSendMessage } from '..';
import { useMessageForm } from '../../../../../contexts/MessageFormContext';

type MessageInputProps = {
  handleSendMessage: HandleSendMessage;
  handleMessageInputSize: HandleMessageInputSize;
};

export const messageInputInitialHeight = 45;

export function MessageInput({
  handleSendMessage,
  handleMessageInputSize,
}: MessageInputProps) {
  const [enterWasPressedToSendMessage, setEnterWasPressedToSendMessage] =
    useState(false);

  const {
    messageForm: { register },
    messageInputRef,
  } = useMessageForm();

  const { ref, ...registerRest } = register('message');

  async function handleTextAreaSize() {
    if (enterWasPressedToSendMessage) {
      await handleSendMessage();
      setEnterWasPressedToSendMessage(false);
    }

    handleMessageInputSize();
  }

  function handleSendMessageWithEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      setEnterWasPressedToSendMessage(true);
    }
  }

  const defaultStyles: any = useStyleConfig('Textarea');

  return (
    <Box
      {...defaultStyles}
      borderRadius='10px'
      py='10.5px'
      fontFamily='Roboto'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
      contentEditable
      h='auto'
      minH='0'
      maxH={['200.5px']}
      overflowY='auto'
      _hover={{
        borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.800'),
      }}
      placeholder='Mensagem'
      sx={{
        '&::-webkit-scrollbar-thumb': {
          borderWidth: '9px 3px',
        },
      }}
    />
  );
}

/* <Textarea
        maxLength={1000}
        onInput={handleTextAreaSize}
        onKeyDown={handleSendMessageWithEnter}
        resize='none'
        overflowY='hidden'
        h={`${messageInputInitialHeight}px`}
        borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
        bg={useColorModeValue('white', 'blackAlpha.500')}
        fontFamily='Roboto'
        pt='11.25px'
        borderRadius='10px'
        rows={1}
        placeholder='Sua mensagem...'
        pr={['73px', '83px', '103px']}
        _placeholderShown={{
          textOverflow: 'ellipsis',
        }}
        _placeholder={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        _hover={{
          borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.800'),
        }}
        sx={{
          '&::-webkit-scrollbar-thumb': {
            borderWidth: '9px 3px',
          },
        }}
        {...registerRest}
        ref={(e) => {
          ref(e);
          messageInputRef.current = e;
        }}
      /> */
