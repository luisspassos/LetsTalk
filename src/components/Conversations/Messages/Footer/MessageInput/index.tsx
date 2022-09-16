import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import Graphemer from 'graphemer';
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

type TwemojisCallback = (twemojisHtml: string) => DocumentFragment | string;

type TwemojiCallback = (twemoji: Twemoji) => HTMLSpanElement | string;

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

      const selection = getSelection();

      function positionSelectionAndInsertNode(node: Emoji | Text) {
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

        selectionRange?.insertNode(node);

        // on Windows
        const newValueCameFromNativeEmojiPicker =
          e.inputType === 'insertCompositionText';

        if (!newValueCameFromNativeEmojiPicker) selectionRange?.collapse();
      }

      const { regexs } = await import('../../../../../utils/regexs');

      const thereAreEmojis = regexs.emoji.test(newValue);

      if (thereAreEmojis) {
        const graphemer = new Graphemer();

        const numberOfCharacters = graphemer.countGraphemes(newValue);

        const thereAreMoreCharacters = numberOfCharacters > 1;

        // the link character is invisible
        const linkCharacter = '‍';

        const createTwemojiHtml = (text: string, url: string) => {
          return `<span class="emoji" style="background-image: url(${url})">${text}</span>`;
        };

        const createTwemojiElement = async (
          emoji: string,
          twemojisCallback: TwemojisCallback,
          twemojiCallback: TwemojiCallback
        ) => {
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

            const twemoji = parse(emoji);

            return twemoji.length > 1 ? twemoji : twemoji[0];
          };

          const specialTwemoji = specialTwemojis[emoji];

          const twemojiOrTwemojis = (specialTwemoji || (await getTwemoji())) as
            | Twemoji
            | Twemoji[];

          const isTwemojis = Array.isArray(twemojiOrTwemojis);

          if (isTwemojis) {
            let twemojisHtml = '';

            const insertLinkCharacters = () => {
              for (const index in twemojiOrTwemojis) {
                const twemoji = twemojiOrTwemojis[index];

                const twemojiHtml = createTwemojiHtml(
                  twemoji.text,
                  twemoji.url
                );

                twemojisHtml += twemojiHtml;

                const isLast = twemojiOrTwemojis.length - 1 === Number(index);

                if (isLast) break;

                twemojisHtml += linkCharacter;
              }
            };

            insertLinkCharacters();

            const twemojiElement = twemojisCallback(twemojisHtml);

            return twemojiElement;
          }

          const twemojiElement = twemojiCallback(twemojiOrTwemojis);

          return twemojiElement;
        };

        if (thereAreMoreCharacters) {
          const content = document.createElement('span');
          content.textContent = newValue;

          const preventTextFromFlashingWhenChangingHtml = () => {
            content.style.fontSize = '0';
          };

          preventTextFromFlashingWhenChangingHtml();

          positionSelectionAndInsertNode(content);

          const innerHTML = content.innerHTML;
          const chars = graphemer.splitGraphemes(innerHTML);

          const charPromises = chars.map((char) => {
            const isEmoji = regexs.emoji.test(char);

            if (!isEmoji) return char;

            const twemojisCallback: TwemojisCallback = (twemojisHtml) => {
              return twemojisHtml;
            };

            const twemojiCallback: TwemojiCallback = (twemoji) => {
              const twemojiHtml = createTwemojiHtml(twemoji.text, twemoji.url);

              return twemojiHtml;
            };

            const twemojiEl = createTwemojiElement(
              char,
              twemojisCallback,
              twemojiCallback
            );

            return twemojiEl;
          });

          const newChars = await Promise.all(charPromises);

          const newInnerHTML = newChars.join('');

          const timeoutToChangeHtmlAndPreventBugs = 0;

          setTimeout(() => {
            content.innerHTML = newInnerHTML;
            content.style.fontSize = '';

            const selectionRange = selection?.getRangeAt(0);

            selectionRange?.setStartAfter(content);
          }, timeoutToChangeHtmlAndPreventBugs);
        } else {
          const twemojisCallback: TwemojisCallback = (twemojisHtml) => {
            const twemojiEl = document.createElement('template');
            twemojiEl.innerHTML = twemojisHtml;

            return twemojiEl.content;
          };

          const twemojiCallback: TwemojiCallback = (twemoji) => {
            const twemojiElement = document.createElement('span');
            twemojiElement.className = 'emoji';
            twemojiElement.textContent = twemoji.text;
            twemojiElement.style.backgroundImage = `url(${twemoji.url})`;

            return twemojiElement;
          };

          const twemojiEl = await createTwemojiElement(
            newValue,
            twemojisCallback,
            twemojiCallback
          );

          if (typeof twemojiEl === 'string') return;

          positionSelectionAndInsertNode(twemojiEl);
        }
      } else {
        e.preventDefault();

        const specialChars: Record<string, string> = {
          ' ': '\xA0',
        };

        const specialChar = specialChars[newValue];

        const value = specialChar || newValue;

        const textNode = document.createTextNode(value);

        positionSelectionAndInsertNode(textNode);
      }

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
