import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';

type Styles = {
  default: any;
  HSpacing: string;
};

type SpecialTwemojis = Record<
  string,
  {
    text: string;
    url: string;
  }
>;

export function MessageInput() {
  const ref = useMessageInputRef();

  useEffect(() => {
    const messageInput = ref.current;

    let preventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters = false;

    async function handleEmojis(e: InputEvent) {
      if (preventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters) return;

      const newValue = e.data;

      if (!newValue) return;

      const { regexs } = await import('../../../../../utils/regexs');

      const isEmoji = regexs.emoji.test(newValue);

      if (!isEmoji) return;

      const specialTwemojis: SpecialTwemojis = {
        '👁️‍🗨️': {
          text: '👁️‍🗨️',
          url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
        },

        '♾️': {
          text: '♾️',
          url: 'https://twemoji.maxcdn.com/v/latest/svg/267e.svg',
        },
      };

      const getTwemoji = async () => {
        const { parse } = await import('twemoji-parser');

        const twemoji = parse(newValue)[0];

        return twemoji;
      };

      const twemoji = specialTwemojis[newValue] || (await getTwemoji());

      const emojiEl = document.createElement('span');
      emojiEl.className = 'emoji';
      emojiEl.textContent = twemoji.text;
      emojiEl.style.backgroundImage = `url(${twemoji.url})`;

      const selection = getSelection();

      const elementThatIsCloseToTheEmojiToBeInserted =
        selection?.anchorNode?.parentElement;

      const emojiHasBeenPlacedCloseToAnEmoji =
        elementThatIsCloseToTheEmojiToBeInserted?.className === 'emoji';

      const emojiHasBeenPlacedAtTheBeginningOfTheInput =
        selection?.anchorOffset === 0;

      const selectionRange = selection?.getRangeAt(0);

      if (emojiHasBeenPlacedCloseToAnEmoji) {
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

      selectionRange?.insertNode(emojiEl);

      preventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters = true;

      const timeToPreventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters = 0;

      setTimeout(() => {
        preventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters = false;
      }, timeToPreventHandleEmojisFromRunningTwiceBecauseOfSomeCharacters);
    }

    // addEventListener is being used to avoid bugs
    messageInput?.addEventListener('beforeinput', handleEmojis);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleEmojis);
    };
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
