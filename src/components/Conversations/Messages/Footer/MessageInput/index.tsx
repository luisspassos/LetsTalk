import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';
import getEmojiRegex from 'emoji-regex';

type Styles = {
  default: any;
  HSpacing: string;
};

export function MessageInput() {
  const ref = useMessageInputRef();

  useEffect(() => {
    let preventHandleInputMethodEditorFromRunningTwice = false;

    async function handleInputMethodEditor(e: InputEvent) {
      if (preventHandleInputMethodEditorFromRunningTwice) return;

      const newValue = e.data;

      if (!newValue) return;

      const emojiRegex = getEmojiRegex();

      const isEmoji = emojiRegex.test(newValue);

      if (isEmoji) {
        const { parse: twemojiParse } = await import('twemoji-parser');

        const twemoji = twemojiParse(newValue)[0];

        const twemojiElement = document.createElement('span');
        twemojiElement.className = 'emoji';
        twemojiElement.textContent = twemoji.text;
        twemojiElement.style.backgroundImage = `url(${twemoji.url})`;

        const selection = getSelection();

        const elementThatIsCloseToTheEmojiToBeInserted =
          selection?.anchorNode?.parentElement;

        const emojiHasBeenPlacedCloseToAnEmoji =
          elementThatIsCloseToTheEmojiToBeInserted?.className === 'emoji';

        const selectionRange = selection?.getRangeAt(0);

        if (emojiHasBeenPlacedCloseToAnEmoji) {
          const emojiHasBeenPlacedAtTheBeginningOfTheInput =
            selection?.anchorOffset === 0;

          if (emojiHasBeenPlacedAtTheBeginningOfTheInput) {
            selectionRange?.setStartBefore(
              elementThatIsCloseToTheEmojiToBeInserted
            );
          } else {
            selectionRange?.setStartAfter(
              elementThatIsCloseToTheEmojiToBeInserted
            );
          }
        }

        selectionRange?.insertNode(twemojiElement);
      }

      preventHandleInputMethodEditorFromRunningTwice = true;

      const timeToPreventHandleInputMethodEditorFromRunningTwice = 0;

      setTimeout(() => {
        preventHandleInputMethodEditorFromRunningTwice = false;
      }, timeToPreventHandleInputMethodEditorFromRunningTwice);
    }

    const messageInput = ref.current;

    messageInput?.addEventListener('beforeinput', handleInputMethodEditor);
  }, [ref]);

  const styles: Styles = {
    default: useStyleConfig('Textarea'),
    HSpacing: '10.5px',
  };

  return (
    <Box
      {...styles.default}
      ref={ref}
      borderRadius='10px'
      py={styles.HSpacing}
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
      _selection={{
        bgColor: 'blueAlpha.200',
      }}
      sx={{
        '*::selection': {
          bgColor: 'blueAlpha.200',
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          margin: styles.HSpacing,
        },
        '::-webkit-scrollbar-thumb': {
          bgColor: 'transparent',
          borderLeftColor: useColorModeValue(
            colors.scrollbar.light,
            colors.scrollbar.dark
          ),
          borderLeftStyle: 'solid',
          borderLeftWidth: '4px',
        },
        '.emoji': {
          letterSpacing: '1px',
          bgRepeat: 'no-repeat',
          bgPos: 'center',
          color: 'transparent',
          caretColor: useColorModeValue(
            'var(--chakra-colors-gray-900)',
            'var(--chakra-colors-gray-50)'
          ),
          '&::selection': {
            color: 'transparent',
          },
        },
      }}
    />
  );
}
