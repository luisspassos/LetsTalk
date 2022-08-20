import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { FormEvent } from 'react';

type BeforeInputEvent = FormEvent<HTMLDivElement> & {
  data: string;
  target: HTMLDivElement;
};

export function MessageInput() {
  let oldMessage = '';

  async function handleInsertValues(e: BeforeInputEvent) {
    const messageInput = e.target;

    messageInput.innerHTML = oldMessage;

    const newValue = e.data;

    const Graphemer = (await import('graphemer')).default;
    const graphemer = new Graphemer();

    const newValueChars = graphemer.splitGraphemes(newValue);

    for (const char of newValueChars) {
      const { regexs } = await import('../../../../../utils/regexs');

      const isEmoji = regexs.emoji.test(char);

      if (isEmoji) {
        const { parse: twemojiParse } = await import('twemoji-parser');

        const twemojiEmojis = twemojiParse(char);

        for (const emoji of twemojiEmojis) {
          const element = document.createElement('span');
          element.textContent = emoji.text;
          element.style.backgroundImage = `url(${emoji.url})`;
          element.className = 'emoji';

          const selection = getSelection();
          const range = selection?.getRangeAt(0);

          range?.insertNode(element);
        }
      }
    }

    const message = messageInput.innerHTML;

    oldMessage = message;
  }

  const defaultStyles: any = useStyleConfig('Textarea');

  return (
    <Box
      {...defaultStyles}
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
          bgSize: 'contain',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
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
      onBeforeInput={handleInsertValues}
    />
  );
}
