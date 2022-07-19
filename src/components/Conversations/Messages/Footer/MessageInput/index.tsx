import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useState } from 'react';

type MessageInputEvent = { target: HTMLDivElement };

export function MessageInput() {
  const [oldMessage, setOldMessage] = useState('');
  const [continueInputEvent, setContinueInputEvent] = useState(true);

  async function handleInput(e: MessageInputEvent) {
    if (!continueInputEvent) return;

    const message = e.target.textContent ?? '';

    const Graphemer = (await import('graphemer')).default;
    const splitter = new Graphemer();

    const messageChars = splitter.splitGraphemes(message);
    const oldMessageChars = splitter.splitGraphemes(oldMessage);

    const newValue = messageChars.find(
      (char, i) => char !== oldMessageChars[i]
    );

    if (!newValue) return;

    const { regexs } = await import('../../../../../utils/regexs');

    const isEmoji = regexs.emoji.test(newValue);

    if (isEmoji) {
      const { parse: twemojiParse } = await import('twemoji-parser');

      const emojiUrl = twemojiParse(newValue)[0].url;

      const emojiHtml = document.createElement('span');
      emojiHtml.className = 'emoji';
      emojiHtml.style.backgroundImage = `url(${emojiUrl})`;
      emojiHtml.textContent = newValue;

      e.target.textContent = oldMessage;

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      range?.insertNode(emojiHtml);
      selection?.collapseToEnd();
    }

    setOldMessage(message);

    // it is for the event not to run 2 times when inserting an emoji
    setContinueInputEvent(false);

    setTimeout(() => {
      setContinueInputEvent(true);
    }, 0);
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
        '.emoji': {
          bgSize: 'contain',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          color: 'transparent',
          caretColor: 'var(--chakra-colors-gray-50)',
          '&::selection': {
            color: 'transparent',
            bgColor: 'rgba(0, 0, 255, 0.438)',
          },
        },
      }}
      onInput={handleInput}
    />
  );
}
