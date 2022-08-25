import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Graphemer from 'graphemer';

type Emoji = {
  text: string;
  url: string;
};

type SpecialEmojis = Record<string, Emoji>;

type TwemojiOrTwemojis = Emoji | Emoji[];

export function MessageInput() {
  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  useEffect(() => {
    async function handleDropAndPaste(e: InputEvent) {
      if (!e.dataTransfer) return;

      const newValueTypes = e.dataTransfer.types;

      const doesNotHaveHtml =
        newValueTypes.length === 1 && newValueTypes[0] === 'text/plain';

      const { regexs } = await import('../../../../../utils/regexs');

      let dataTransfer = e.dataTransfer.getData('text');

      const hasEmojis = regexs.emoji.test(dataTransfer);

      if (doesNotHaveHtml && !hasEmojis) return;

      e.preventDefault();

      if (hasEmojis) {
        const graphemer = new Graphemer();

        const dataTransferChars = graphemer.splitGraphemes(dataTransfer);

        const { parse } = await import('twemoji-parser');

        const newDataTransfer = dataTransferChars
          .map((char) => {
            const isEmoji = regexs.emoji.test(char);

            if (!isEmoji) return char;

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

            const getParsedEmoji = () => {
              const twemoji = parse(char);

              return twemoji.length > 1 ? twemoji : twemoji[0];
            };

            const twemojiOrTwemojs = (specialEmojis[char] ??
              getParsedEmoji()) as TwemojiOrTwemojis;

            const getElement = (text: string, url: string) =>
              `<span class='emoji' style='background-image: url(${url})'>${text}</span>`;

            if (Array.isArray(twemojiOrTwemojs)) {
              let element = '';

              for (const twemoji of twemojiOrTwemojs) {
                element += getElement(twemoji.text, twemoji.url);
              }

              return element;
            }

            const element = getElement(
              twemojiOrTwemojs.text,
              twemojiOrTwemojs.url
            );

            return element;
          })
          .join('');

        dataTransfer = newDataTransfer;
      }

      // 2:14:00

      const selection = getSelection();
      const selectionRange = selection?.getRangeAt(0);

      const isPaste = e.dataTransfer.effectAllowed === 'uninitialized';

      if (isPaste && !selection?.isCollapsed) selectionRange?.deleteContents();

      const element = document.createElement('template');
      element.innerHTML = dataTransfer;

      const html = element.content;

      selectionRange?.insertNode(html);

      if (isPaste) selection?.collapseToEnd();
    }

    async function handleEmojis(e: Event & { target: HTMLDivElement }) {
      const message = e.target.textContent ?? '';

      const graphemer = new Graphemer();

      const chars = graphemer.splitGraphemes(message);

      const { regexs } = await import('../../../../../utils/regexs');
      const { parse } = await import('twemoji-parser');

      const newChars = chars.map((char) => {
        const isEmoji = regexs.emoji.test(char);

        if (isEmoji) {
          const url = parse(char)[0].url;

          const element = `<span class='emoji' style='background-image: url(${url})'>${char}</span>`;

          return element;
        }

        return char;
      });

      const newMessage = newChars.join('');

      e.target.innerHTML = newMessage;
    }

    // messageInput?.addEventListener('beforeinput', handleDropAndPaste);
    messageInput?.addEventListener('input', handleEmojis);

    return () => {
      // messageInput?.removeEventListener('beforeinput', handleDropAndPaste);
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
