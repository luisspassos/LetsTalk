import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Graphemer from 'graphemer';

type Event = {
  name: string;
  func: EventListener;
};

type Emoji = {
  text: string;
  url: string;
};

type SpecialEmojis = Record<string, Emoji[]>;

const linkCharacter = '‍';

type Emojis = (Emoji | typeof linkCharacter)[];

const graphemer = new Graphemer();

export function MessageInput() {
  const ref = useRef<HTMLDivElement>();
  const messageInput = ref.current;

  useEffect(() => {
    let preventTheBeforeInputEventFromRunningTwice = false;

    // this is to prevent the value from being inserted twice
    const message = {
      data: '',
      restore: false,
      selectionPosition: 0,
    };

    async function handleInsertValues(e: InputEvent) {
      const newValue = e.data ?? e.dataTransfer?.getData('text');

      if (newValue === undefined || preventTheBeforeInputEventFromRunningTwice)
        return;

      const selection = getSelection();
      const selectionRange = selection?.getRangeAt(0);

      const newValueChars = graphemer.splitGraphemes(newValue);

      for (const char of newValueChars) {
        const { regexs } = await import('../../../../../utils/regexs');

        const isEmoji = regexs.emoji.test(char);

        if (isEmoji) {
          const { parse: twemojiParse } = await import('twemoji-parser');

          const specialEmojis: SpecialEmojis = {
            '👁️‍🗨️': [
              {
                text: '👁️‍🗨️',
                url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
              },
            ],
            '♾️': [
              {
                text: '♾️',
                url: 'https://twemoji.maxcdn.com/v/latest/svg/267e.svg',
              },
            ],
          };

          const getEmojis = () => {
            const emojis = twemojiParse(char);

            const thereAreMoreEmojis = emojis.length > 1;

            if (!thereAreMoreEmojis) return emojis;

            message.restore = true;

            const emojisWithLinkCharacter = [];

            for (const index in emojis) {
              const emoji = emojis[index];

              emojisWithLinkCharacter.push(emoji);

              const isLast = emojis.length - 1 === Number(index);

              if (isLast) continue;

              // the link character is invisible
              emojisWithLinkCharacter.push(linkCharacter);
            }

            return emojisWithLinkCharacter;
          };

          const emojis: Emojis = specialEmojis[char] ?? getEmojis();

          for (const index in emojis) {
            const newIndex = Number(index);

            const emoji = emojis[newIndex];

            let element;

            if (emoji === linkCharacter) {
              element = document.createTextNode(linkCharacter);
            } else {
              element = document.createElement('span');

              element.textContent = emoji.text;
              element.style.backgroundImage = `url(${emoji.url})`;
              element.className = 'emoji';

              const userInsertedValueWasNextToAnEmoji =
                selectionRange?.commonAncestorContainer.parentElement
                  ?.className === 'emoji';

              if (userInsertedValueWasNextToAnEmoji) {
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

                  selectionRange?.setStartAfter(
                    elementThatWasCloseToTheInsertion
                  );
                }
              }
            }

            selectionRange?.insertNode(element);

            const thereAreMoreEmojis = emojis.length > 1;

            if (thereAreMoreEmojis) {
              selectionRange?.setStartAfter(element);

              const isLast = emojis.length - 1 === Number(index);

              if (isLast) {
                const selectionPosition = selectionRange?.startOffset ?? 0;

                message.selectionPosition = selectionPosition;
              }
            }
          }

          continue;
        }

        const userInsertedValueWasNextToAnEmoji =
          selectionRange?.commonAncestorContainer.parentElement?.className ===
          'emoji';

        if (userInsertedValueWasNextToAnEmoji) {
          const node = document.createTextNode(char);

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

            console.log(elementThatWasCloseToTheInsertion);

            if (!elementThatWasCloseToTheInsertion) return;

            selectionRange?.setStartAfter(elementThatWasCloseToTheInsertion);
          }

          selectionRange.insertNode(node);
        }
      }

      if (message.restore) {
        const newMessage = messageInput?.innerHTML ?? '';

        message.data = newMessage;
      }

      preventTheBeforeInputEventFromRunningTwice = true;

      setTimeout(() => {
        preventTheBeforeInputEventFromRunningTwice = false;
      }, 0);
    }

    let continueInputEvent = false;

    function handleRestoreMessage() {
      if (!message.restore || !messageInput) return;

      if (!continueInputEvent) {
        continueInputEvent = true;

        return;
      }

      messageInput.innerHTML = message.data;

      const selection = getSelection();

      selection?.setPosition(messageInput, message.selectionPosition);

      message.restore = false;
      continueInputEvent = false;
    }

    const events = [
      {
        name: 'beforeinput',
        func: handleInsertValues,
      },
      {
        name: 'input',
        func: handleRestoreMessage,
      },
    ] as Event[];

    for (const event of events) {
      // addEventListener is being used to prevent bugs
      messageInput?.addEventListener(event.name, event.func);
    }

    return () => {
      for (const event of events) {
        messageInput?.removeEventListener(event.name, event.func);
      }
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
