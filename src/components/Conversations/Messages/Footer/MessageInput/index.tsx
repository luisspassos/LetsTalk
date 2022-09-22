import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';
import emojiRegex from 'twemoji-parser/dist/lib/regex';
import { EmojiEntity } from 'twemoji-parser';

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

type Events = {
  type: string;
  func: EventListenerOrEventListenerObject;
}[];

export function MessageInput() {
  const ref = useMessageInputRef();

  useEffect(() => {
    let preventHandleInputMethodEditorFromRunningTwice = false;

    async function handleEmojis(e: InputEvent) {
      if (preventHandleInputMethodEditorFromRunningTwice) {
        e.preventDefault();

        return;
      }

      const newValue = e.data;

      if (!newValue) return;

      const emojis = newValue.match(emojiRegex);

      if (emojis) {
        const selection = getSelection();
        const selectionRange = selection?.getRangeAt(0);

        const positionSelectionIfValueHasBeenPlacedCloseToAnEmoji = () => {
          const elementThatIsCloseToTheEmojiToBeInserted =
            selection?.anchorNode?.parentElement;

          const emojiHasBeenPlacedCloseToAnEmoji =
            elementThatIsCloseToTheEmojiToBeInserted?.className === 'emoji';

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
        };

        positionSelectionIfValueHasBeenPlacedCloseToAnEmoji();

        const getTwemoji = async (emoji: string) => {
          const specialTwemojis: SpecialTwemojis = {
            '👁️‍🗨️': {
              text: '👁️‍🗨️',
              url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
            },
            '🏳‍🌈': {
              text: '🏳️‍🌈',
              url: 'https://twemoji.maxcdn.com/v/latest/svg/1f3f3-fe0f-200d-1f308.svg',
            },
          };

          const specialTwemoji = specialTwemojis[newValue];

          const getTwemoji = async () => {
            const { parse: parse } = await import('twemoji-parser');

            const twemoji = parse(emoji)[0];

            return twemoji;
          };

          const twemoji = specialTwemoji || (await getTwemoji());

          return twemoji;
        };

        const thereAreOtherCharactersOtherThanEmoji = newValue.replace(
          emojiRegex,
          ''
        );

        let content;

        if (thereAreOtherCharactersOtherThanEmoji) {
          const template = document.createElement('template');
          template.content.textContent = newValue;

          // innerHTML format some characters to HTML
          const newValueFormatted = template.innerHTML;

          const { parse: twemojiParser } = await import('twemoji-parser');

          const twemojis = twemojiParser(newValueFormatted);

          let newValueWithTwemojis = '';

          for (const i in twemojis) {
            const index = Number(i);

            const twemoji = twemojis[index];

            const rangeOfCharactersThatTheEmojiOccupies = {
              start: twemoji.indices[0],
              end: twemoji.indices[1],
            };

            const isFirst = index === 0;

            if (isFirst) {
              newValueWithTwemojis += newValueFormatted.substring(
                0,
                rangeOfCharactersThatTheEmojiOccupies.start
              );
            }

            const nextTwemoji: EmojiEntity | undefined = twemojis[index + 1];

            const rangeOfCharactersThatTheNextEmojiOccupies = {
              end: nextTwemoji.indices[0],
            };

            const element = `<span class='emoji' style='background-image: url(${twemoji.url})'>${twemoji.text}</span>`;

            newValueWithTwemojis +=
              element +
              newValueFormatted.substring(
                rangeOfCharactersThatTheEmojiOccupies.end,
                rangeOfCharactersThatTheNextEmojiOccupies.end
              );
          }

          console.log(newValueWithTwemojis);

          // const twemojisFormatted = twemojis.map(({ text, url, indices }) => {
          //   const element = `<span class='emoji' style='background-image: url(${url})'>${text}</span>`;

          //   return {
          //     element,
          //     indices,
          //   };
          // });

          // const charsWithoutEmojis = newValueFormatted.split(emojiRegex);

          // const twemojisPromises = emojis.map((emoji) => {
          //   const twemoji = getTwemoji(emoji);

          //   return twemoji;
          // });

          // const twemojis = await Promise.all(twemojisPromises);

          // const twemojiElements = twemojis.map((twemoji) => {
          //   const element = `<span class='emoji' style='background-image: url(${twemoji.url})'>${twemoji.text}</span>`;

          //   return element;
          // });

          // const newChars: string[] = [];

          // const insertTwemojis = () => {
          //   for (const index in charsWithoutEmojis) {
          //     const char = charsWithoutEmojis[index];

          //     newChars.push(char);

          //     const isLast = charsWithoutEmojis.length - 1 === Number(index);

          //     if (isLast) break;

          //     const twemoji = twemojiElements[index];

          //     newChars.push(twemoji);
          //   }
          // };

          // insertTwemojis();

          // const newValueHTML = newChars.join('');

          // template.innerHTML = newValueHTML;

          content = template.content;
        } else {
          const twemoji = await getTwemoji(newValue);

          const twemojiElement = document.createElement('span');
          twemojiElement.className = 'emoji';
          twemojiElement.textContent = twemoji.text;
          twemojiElement.style.backgroundImage = `url(${twemoji.url})`;

          content = twemojiElement;
        }

        selectionRange?.insertNode(content);
      }

      preventHandleInputMethodEditorFromRunningTwice = true;

      const timeToPreventHandleInputMethodEditorFromRunningTwice = 0;

      setTimeout(() => {
        preventHandleInputMethodEditorFromRunningTwice = false;
      }, timeToPreventHandleInputMethodEditorFromRunningTwice);
    }

    let preventInputEventFromRunningTwiceBecauseOfInputMethodEditor = false;

    async function handleValuesWithoutEmojis(e: InputEvent) {
      if (preventInputEventFromRunningTwiceBecauseOfInputMethodEditor) return;

      const newValue = e.data;

      const thereAreEmojis = emojiRegex.test(newValue);

      if (thereAreEmojis) return;

      const selection = getSelection();

      const elementThatIsNextToTheInsertedValue =
        selection?.anchorNode?.parentElement;

      const valueHasBeenPlacedNextToAnEmoji =
        elementThatIsNextToTheInsertedValue?.className === 'emoji';

      if (!valueHasBeenPlacedNextToAnEmoji) return;

      const currentText = selection?.anchorNode?.textContent;

      const emoji = currentText?.match(emojiRegex)[0];

      elementThatIsNextToTheInsertedValue.textContent = emoji;

      const emojiIndex = currentText?.indexOf(emoji);
      const valueHasBeenPlacedToTheRightOfTheEmoji = emojiIndex === 0;

      const insertPosition: InsertPosition =
        valueHasBeenPlacedToTheRightOfTheEmoji ? 'afterend' : 'beforebegin';

      const textWithoutEmoji = currentText?.replace(emojiRegex, '');

      elementThatIsNextToTheInsertedValue?.insertAdjacentText(
        insertPosition,
        textWithoutEmoji
      );

      const sibling = valueHasBeenPlacedToTheRightOfTheEmoji
        ? 'nextSibling'
        : 'previousSibling';

      const selectionRange = selection?.getRangeAt(0);

      selectionRange?.setStartAfter(
        elementThatIsNextToTheInsertedValue[sibling]
      );

      preventInputEventFromRunningTwiceBecauseOfInputMethodEditor = true;

      const timeToPreventInputEventFromRunningTwiceBecauseOfInputMethodEditor = 0;

      setTimeout(() => {
        preventInputEventFromRunningTwiceBecauseOfInputMethodEditor = false;
      }, timeToPreventInputEventFromRunningTwiceBecauseOfInputMethodEditor);
    }

    const events = [
      {
        type: 'beforeinput',
        func: handleEmojis,
      },
      {
        type: 'input',
        func: handleValuesWithoutEmojis,
      },
    ] as unknown as Events;

    const messageInput = ref.current;

    // addEventListener is for preventing bugs
    for (const event of events) {
      messageInput?.addEventListener(event.type, event.func);
    }

    return () => {
      for (const event of events) {
        messageInput?.removeEventListener(event.type, event.func);
      }
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
      fontFamily='Roboto, sans-serif'
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
          bgRepeat: 'no-repeat',
          bgPos: 'center',
          color: 'transparent',
          fontFamily: 'Noto Emoji, sans-serif',
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
