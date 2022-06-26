import { Textarea, useColorModeValue, Flex, HStack } from '@chakra-ui/react';
import { KeyboardEvent, MutableRefObject, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { HandleMessageInputSize, HandleSendMessage, MessageInputRef } from '..';
import { MessageFormData } from '../../../../../utils/types';
import { EmojiButton } from './EmojiButton';
import { FileButton } from './FileButton';

type MessageInputProps = {
  register: UseFormRegister<MessageFormData>;
  handleSendMessage: HandleSendMessage;
  handleMessageInputSize: HandleMessageInputSize;
  messageInputRef: MutableRefObject<MessageInputRef>;
};

export const messageInputInitialHeight = 45;

export function MessageInput({
  register,
  handleSendMessage,
  messageInputRef,
  handleMessageInputSize,
}: MessageInputProps) {
  const [enterWasPressedToSendMessage, setEnterWasPressedToSendMessage] =
    useState(false);

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

  return (
    <Flex align='center' justify='end' flex='1' maxW='750px' pos='relative'>
      <Textarea
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
        borderRadius={['11px', '13px', '15px']}
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
      />
      <HStack pos='absolute' spacing='5px' mr='10px' zIndex='1'>
        <EmojiButton />
        <FileButton />
      </HStack>
    </Flex>
  );
}
