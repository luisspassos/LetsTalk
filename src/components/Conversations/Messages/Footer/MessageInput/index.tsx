import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Graphemer from 'graphemer';

const graphemer = new Graphemer();

export function MessageInput() {
  const ref = useRef<HTMLDivElement>();
  const messageInput = ref.current;

  useEffect(() => {
    let preventTheBeforeInputEventFromRunningTwice = false;

    async function handleInsertValues(e: InputEvent) {
      if (preventTheBeforeInputEventFromRunningTwice) {
        preventTheBeforeInputEventFromRunningTwice = false;

        return;
      }

      const newValue = e.data ?? e.dataTransfer?.getData('text');

      if (newValue === undefined) return;

      const selection = getSelection();
      const selectionRange = selection?.getRangeAt(0);

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

            const emojiHasBeenPlacedAtTheBeginningOfTheInput =
              selectionRange?.startOffset === 0;

            if (
              emojiHasBeenPlacedAtTheBeginningOfTheInput &&
              messageInput?.firstChild
            ) {
              selectionRange?.setStartBefore(messageInput?.firstChild);
            }

            if (!emojiHasBeenPlacedAtTheBeginningOfTheInput) {
              const elementThatWasCloseToTheInsertion =
                selectionRange?.commonAncestorContainer.parentElement;

              if (!elementThatWasCloseToTheInsertion) return;

              selectionRange?.setStartAfter(elementThatWasCloseToTheInsertion);
            }

            selectionRange?.insertNode(element);
          }
        }
      }

      preventTheBeforeInputEventFromRunningTwice = true;
    }

    // addEventListener is being used to prevent bugs
    messageInput?.addEventListener('beforeinput', handleInsertValues);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleInsertValues);
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
    />
  );
}
