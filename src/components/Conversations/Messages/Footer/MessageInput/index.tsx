import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';
import getEmojiRegex from 'emoji-regex';
import { CompositionEvent } from 'react';

type Styles = {
  default: any;
  HSpacing: string;
};

export function MessageInput() {
  let preventHandleInputMethodEditorFromRunningTwice = true;

  async function handleInputMethodEditor(e: CompositionEvent<HTMLDivElement>) {
    if (preventHandleInputMethodEditorFromRunningTwice) {
      preventHandleInputMethodEditorFromRunningTwice = false;

      return;
    }

    const newValue = e.data;

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

      const elementThatIsCloseToTheContentToBeInserted =
        selection?.anchorNode?.parentElement;

      const contentHasBeenPlacedCloseToAnEmoji =
        elementThatIsCloseToTheContentToBeInserted?.className === 'emoji';

      const selectionRange = selection?.getRangeAt(0);

      if (contentHasBeenPlacedCloseToAnEmoji) {
        const contentHasBeenPlacedAtTheBeginningOfTheInput =
          selection?.anchorOffset === 0;

        if (contentHasBeenPlacedAtTheBeginningOfTheInput) {
          selectionRange?.setStartBefore(
            elementThatIsCloseToTheContentToBeInserted
          );
        } else {
          selectionRange?.setStartAfter(
            elementThatIsCloseToTheContentToBeInserted
          );
        }
      }

      selectionRange?.insertNode(twemojiElement);

      preventHandleInputMethodEditorFromRunningTwice = true;
    }
  }

  const styles: Styles = {
    default: useStyleConfig('Textarea'),
    HSpacing: '10.5px',
  };

  const ref = useMessageInputRef();

  return (
    <Box
      {...styles.default}
      ref={ref}
      onCompositionUpdate={handleInputMethodEditor}
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
          },
        },
      }}
    />
  );
}
