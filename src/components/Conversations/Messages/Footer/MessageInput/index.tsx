import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';

type Emoji = DocumentFragment | HTMLSpanElement;

type Styles = {
  default: any;
  HSpacing: string;
};

type Twemoji = {
  text: string;
  url: string;
};

type SpecialTwemojis = Record<string, Twemoji>;

export function MessageInput() {
  const ref = useMessageInputRef();

  useEffect(() => {
    const messageInput = ref.current;

    let preventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters = false;

    async function handleEmojis(e: InputEvent) {
      if (preventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters)
        return;

      const newValue = e.data;

      if (!newValue) return;

      const { regexs } = await import('../../../../../utils/regexs');

      const isEmoji = regexs.emoji.test(newValue);

      let content: Emoji | Text;

      let isSpecialChar = false;

      if (isEmoji) {
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

          const twemoji = parse(newValue);

          return twemoji.length > 1 ? twemoji : twemoji[0];
        };

        const specialTwemoji = specialTwemojis[newValue];

        const twemojiOrTwemojis = (specialTwemoji || (await getTwemoji())) as
          | Twemoji
          | Twemoji[];

        let emoji: Emoji;

        const isTwemojis = Array.isArray(twemojiOrTwemojis);

        if (isTwemojis) {
          let twemojisHtml = '';

          for (const index in twemojiOrTwemojis) {
            const twemoji = twemojiOrTwemojis[index];

            const twemojiHtml = `<span class="emoji" style="background-image: url(${twemoji.url})">${twemoji.text}</span>`;

            twemojisHtml += twemojiHtml;

            const isLast = twemojiOrTwemojis.length - 1 === Number(index);

            if (isLast) break;

            // the emojis link character is invisible
            const emojisLinkCharacter = '‍';

            twemojisHtml += emojisLinkCharacter;
          }

          const emojiEl = document.createElement('template');
          emojiEl.innerHTML = twemojisHtml;

          emoji = emojiEl.content;
        } else {
          emoji = document.createElement('span');
          emoji.className = 'emoji';
          emoji.textContent = twemojiOrTwemojis.text;
          emoji.style.backgroundImage = `url(${twemojiOrTwemojis.url})`;
        }

        content = emoji;
      } else {
        const specialChars: Record<string, string> = {
          ' ': '\xA0',
        };

        const specialChar = specialChars[newValue];

        if (specialChar) {
          e.preventDefault();

          isSpecialChar = true;
        }

        const value = specialChars[newValue] || newValue;

        const textNode = document.createTextNode(value);

        content = textNode;
      }

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

      selectionRange?.insertNode(content);
      if (isSpecialChar) selectionRange?.collapse();

      preventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters = true;

      const timeToPreventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters = 0;

      setTimeout(() => {
        preventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters = false;
      }, timeToPreventBeforeInputEventFromRunningTwiceBecauseOfSomeCharacters);
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
