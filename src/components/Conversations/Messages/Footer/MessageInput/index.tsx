import { Textarea, useColorModeValue, Flex, HStack } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { EmojiButton } from './EmojiButton';
import { FileButton } from './FileButton';

type TextAreaSizeEvent = {
  target: HTMLTextAreaElement;
} & FormEvent<HTMLTextAreaElement>;

export function MessageInput() {
  const initialHeight = 45;

  function handleTextAreaSize(e: TextAreaSizeEvent) {
    e.target.style.height = 'inherit';

    const scrollHeight = e.target.scrollHeight;
    const textAreaHeight = Math.min(Math.max(scrollHeight, initialHeight), 199);

    e.target.style.height = `${textAreaHeight}px`;
    e.target.scrollTop = scrollHeight;

    if (scrollHeight > 199) {
      e.target.style.overflowY = 'visible';
    } else {
      e.target.style.overflowY = 'hidden';
    }
  }

  return (
    <Flex align='center' justify='end' flex='1' maxW='750px' pos='relative'>
      <Textarea
        maxLength={1000}
        onInput={handleTextAreaSize}
        resize='none'
        overflowY='hidden'
        h={`${initialHeight}px`}
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
          borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.700'),
        }}
        sx={{
          '&::-webkit-scrollbar-thumb': {
            borderWidth: '9px 3px',
          },
        }}
      />
      <HStack pos='absolute' spacing='5px' mr='10px' zIndex='1'>
        <EmojiButton />
        <FileButton />
      </HStack>
    </Flex>
  );
}
