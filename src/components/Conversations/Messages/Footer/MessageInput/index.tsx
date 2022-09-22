import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';
import { EmojiEntity } from 'twemoji-parser';

type Styles = {
  default: any;
  HSpacing: string;
};

type Events = {
  type: string;
  func: EventListenerOrEventListenerObject;
}[];

export function MessageInput() {
  const ref = useMessageInputRef();

  useEffect(() => {
    let preventHandleInputMethodEditorFromRunningTwice = false;

    async function getEmojiRegex() {
      const emojiRegex: RegExp = (
        await import('twemoji-parser/dist/lib/regex' as any)
      ).default;

      return emojiRegex;
    }

    async function handleEmojis(e: InputEvent) {
      if (preventHandleInputMethodEditorFromRunningTwice) {
        e.preventDefault();

        return;
      }

      const newValue = e.data;

      if (!newValue) return;

      const emojiRegex = await getEmojiRegex();

      const thereAreEmojis = emojiRegex.test(newValue);

      if (thereAreEmojis) {
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

        const thereAreOtherCharactersOtherThanEmoji = newValue.replace(
          emojiRegex,
          ''
        );

        const { parse: twemojiParser } = await import('twemoji-parser');

        let content;

        if (thereAreOtherCharactersOtherThanEmoji) {
          const template = document.createElement('template');
          template.content.textContent = newValue;

          // innerHTML format some characters to HTML
          const newValueFormatted = template.innerHTML;

          const twemojis = twemojiParser(newValueFormatted);

          const newValueWithTwemojis = twemojis.reduce(
            (prevValue, twemoji, index) => {
              let value = '';

              const rangeOfCharactersThatTheEmojiOccupies = {
                start: twemoji.indices[0],
                end: twemoji.indices[1],
              };

              const isFirst = index === 0;

              if (isFirst) {
                value += newValueFormatted.substring(
                  0,
                  rangeOfCharactersThatTheEmojiOccupies.start
                );
              }

              const nextTwemoji = twemojis[index + 1] as
                | EmojiEntity
                | undefined;

              const rangeOfCharactersThatTheNextEmojiOccupies = {
                end: nextTwemoji?.indices[0],
              };

              const element = `<span class='emoji' style='background-image: url(${twemoji.url})'>${twemoji.text}</span>`;

              value +=
                element +
                newValueFormatted.substring(
                  rangeOfCharactersThatTheEmojiOccupies.end,
                  rangeOfCharactersThatTheNextEmojiOccupies.end
                );

              return prevValue + value;
            },
            ''
          );

          template.innerHTML = newValueWithTwemojis;

          content = template.content;
        } else {
          const twemoji = twemojiParser(newValue)[0];

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

      const emojiRegex = await getEmojiRegex();
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
