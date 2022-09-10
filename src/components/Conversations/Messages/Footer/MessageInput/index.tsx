import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';

type Styles = {
  default: any;
  HSpacing: string;
};

type InputEventType = FormEvent<HTMLDivElement> & {
  target: HTMLDivElement;
  nativeEvent: InputEvent;
};

export function MessageInput() {
  const ref = useMessageInputRef();

  let message = '';
  let handleDuplicateCharacters = false;

  async function handleEmojis(e: InputEventType) {
    console.log(e.target.textContent);

    // const messageInput = e.target;
    // if (handleDuplicateCharacters) {
    //   messageInput.innerHTML = message;
    //   return;
    // }
    // const nativeEvent = e.nativeEvent;
    // const newValue = nativeEvent.data;
    // if (!newValue) return;
    // const { regexs } = await import('../../../../../utils/regexs');
    // const isEmoji = regexs.emoji.test(newValue);
    // if (!isEmoji) return;
    // const { parse: twemojiParse } = await import('twemoji-parser');
    // const twemoji = twemojiParse(newValue)[0];
    // const emoji = document.createElement('span');
    // emoji.className = 'emoji';
    // emoji.style.backgroundImage = `url(${twemoji.url})`;
    // emoji.textContent = twemoji.text;
    // const selection = getSelection();
    // const selectionRange = selection?.getRangeAt(0);
    // selectionRange?.insertNode(emoji);
    // const newMessage = messageInput.innerHTML;
    // message = newMessage;
    // handleDuplicateCharacters = true;
    // const timeToHandleDuplicateCharacters = 0;
    // setTimeout(() => {
    //   handleDuplicateCharacters = false;
    // }, timeToHandleDuplicateCharacters);
  }

  const styles: Styles = {
    default: useStyleConfig('Textarea'),
    HSpacing: '10.5px',
  };

  return (
    <Box
      {...styles.default}
      onBeforeInput={handleEmojis}
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
