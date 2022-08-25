import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Graphemer from 'graphemer';

type Emoji = {
  text: string;
  url: string;
};

type SpecialEmojis = Record<string, Emoji>;

export function MessageInput() {
  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  useEffect(() => {
    async function handleDropAndPaste(e: InputEvent) {
      if (!e.dataTransfer) return;

      const newValueTypes = e.dataTransfer.types;

      const doesNotHaveHtml =
        newValueTypes.length === 1 && newValueTypes[0] === 'text/plain';

      const dataTransfer = e.dataTransfer.getData('text');

      if (doesNotHaveHtml) return;

      e.preventDefault();

      const isPaste = e.dataTransfer.effectAllowed === 'uninitialized';

      const selection = getSelection();

      if (isPaste && !selection?.isCollapsed) selection?.deleteFromDocument();

      const textNode = document.createTextNode(dataTransfer);

      const selectionRange = selection?.getRangeAt(0);

      selectionRange?.insertNode(textNode);

      if (isPaste) selection?.collapseToEnd();
    }

    let oldMessage = '';
    let preventInputEventFromRunningTwice = false;

    async function handleEmojis() {
      if (!messageInput) return;

      if (preventInputEventFromRunningTwice) {
        messageInput.innerHTML = oldMessage;

        return;
      }

      const message = messageInput.textContent ?? '';

      const graphemer = new Graphemer();

      const chars = graphemer.splitGraphemes(message);

      const { regexs } = await import('../../../../../utils/regexs');
      const { parse } = await import('twemoji-parser');

      const newChars = chars.map((char) => {
        const isEmoji = regexs.emoji.test(char);

        if (isEmoji) {
          const specialEmojis: SpecialEmojis = {
            '👁️‍🗨️': {
              text: '👁️‍🗨️',
              url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
            },

            '♾️': {
              text: '♾️',
              url: 'https://twemoji.maxcdn.com/v/latest/svg/267e.svg',
            },
          };

          const url = parse(char)[0].url;

          const element = `<span class='emoji' style='background-image: url(${url})'>${char}</span>`;

          return element;
        }

        return char;
      });

      const newMessage = newChars.join('');

      messageInput.innerHTML = newMessage;

      oldMessage = newMessage;

      preventInputEventFromRunningTwice = true;

      setTimeout(() => {
        preventInputEventFromRunningTwice = false;
      }, 0);
    }

    messageInput?.addEventListener('beforeinput', handleDropAndPaste);
    messageInput?.addEventListener('input', handleEmojis);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleDropAndPaste);
      messageInput?.removeEventListener('input', handleEmojis);
    };
  }, [messageInput]);

  const defaultStyles: any = useStyleConfig('Textarea');

  return (
    <Box
      {...defaultStyles}
      ref={ref}
      borderRadius='10px'
      py='10.5px'
      fontFamily='Roboto, Noto Emoji, sans-serif'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
      contentEditable
      h='auto'
      minH='0'
      maxH='200.5px'
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
          letterSpacing: '2px',
          bgRepeat: 'no-repeat',
          bgPos: 'center',
          color: 'transparent',
          caretColor: useColorModeValue(
            'var(--chakra-colors-gray-900)',
            'var(--chakra-colors-gray-50)'
          ),
          '&::selection': {
            color: 'transparent',
            bgColor: 'rgba(0, 0, 255, 0.438)',
          },
        },
      }}
    />
  );
}
