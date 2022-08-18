import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Graphemer from 'graphemer';

type NativeEvent = Event & {
  data: string;
};

type SavedSelection =
  | {
      start: number;
      end: number;
    }
  | undefined;

type Emoji = {
  text: string;
  url: string;
};

type SpecialEmojis = Record<string, Emoji>;

// the link character is invisible
const linkCharacter = '‍';

type TwemojiWithLinkCharacter = (Emoji | typeof linkCharacter)[];

const graphemer = new Graphemer();

function saveSelection(containerEl: HTMLDivElement) {
  const selection = getSelection();
  const range = selection?.getRangeAt(0);
  const preSelectionRange = range?.cloneRange();
  preSelectionRange?.selectNodeContents(containerEl);

  if (!range?.startContainer) return;

  preSelectionRange?.setEnd(range.startContainer, range?.startOffset);
  const start = preSelectionRange?.toString().length;

  if (start === undefined) return;

  return {
    start: start,
    end: start + range.toString().length,
  };
}

function restoreSelection(
  containerEl: HTMLDivElement,
  savedSelection: SavedSelection
) {
  const selection = getSelection();

  const doc = containerEl.ownerDocument;
  let charIndex = 0;
  const range = doc.createRange();
  range.setStart(containerEl, 0);
  range.collapse(true);
  const nodeStack: (HTMLDivElement | ChildNode)[] = [containerEl];
  let node;
  let foundStart = false;
  let stop = false;

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType == 3) {
      if (!node.textContent || !savedSelection) return;

      const nextCharIndex = charIndex + node.textContent.length;

      if (
        !foundStart &&
        savedSelection?.start >= charIndex &&
        savedSelection?.start <= nextCharIndex
      ) {
        range.setStart(node, savedSelection?.start - charIndex);
        foundStart = true;
      }
      if (
        foundStart &&
        savedSelection?.end >= charIndex &&
        savedSelection?.end <= nextCharIndex
      ) {
        range.setEnd(node, savedSelection?.end - charIndex);
        stop = true;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function MessageInput() {
  const [oldMessage, setOldMessage] = useState('');
  const [savedSelection, setSavedSelection] = useState<SavedSelection>();
  const [
    preventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters,
    setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters,
  ] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  const saveNewSelection = useCallback(() => {
    if (!messageInput) return;

    const newSavedSelection = saveSelection(messageInput);

    setSavedSelection(newSavedSelection);
  }, [messageInput]);

  useEffect(() => {
    function handleBeforeInput() {
      saveNewSelection();
    }

    messageInput?.addEventListener('beforeinput', handleBeforeInput);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleBeforeInput);
    };
  }, [messageInput, saveNewSelection]);

  async function handleInput(e: FormEvent<HTMLDivElement>) {
    const nativeEvent = e.nativeEvent as NativeEvent;
    const newValue = nativeEvent.data;

    if (!newValue || !messageInput) return;

    const restoreOldMessageAndRestoreSelection = () => {
      messageInput.innerHTML = oldMessage;
      restoreSelection(messageInput, savedSelection);
    };

    if (preventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters) {
      restoreOldMessageAndRestoreSelection();

      return;
    }

    const newValueCharacters = graphemer.splitGraphemes(newValue);

    const { regexs } = await import('../../../../../utils/regexs');

    for (const char of newValueCharacters) {
      const isEmoji = regexs.emoji.test(char);

      if (isEmoji) {
        const specialEmojis: SpecialEmojis = {
          '👁️‍🗨️': {
            text: '👁️‍🗨️',
            url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
          },
          '♾️': {
            text: '♾️',
            url: 'https://twemoji.maxcdn.com/v/latest/svg/267e.svg',
          },
        };

        const getParsedEmoji = async () => {
          const { parse: twemojiParse } = await import('twemoji-parser');

          const result = twemojiParse(char);

          const emoji = result.length === 1 ? result[0] : result;

          return emoji;
        };

        const twemoji = specialEmojis[char] || (await getParsedEmoji());

        const insertEmoji = () => {
          const getEmojiElement = (text: string, url: string) => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'emoji';
            emojiElement.textContent = text;
            emojiElement.style.backgroundImage = `url(${url})`;

            return emojiElement;
          };

          const positionElement = (element: HTMLSpanElement) => {
            const selection = getSelection();
            const range = selection?.getRangeAt(0);

            element.remove();

            const emojiHasBeenPlacedAtTheBeginningOfTheInput =
              range?.startOffset === 0;

            if (emojiHasBeenPlacedAtTheBeginningOfTheInput) {
              messageInput.prepend(element);
            } else {
              const elementThatWasNextToTheInsertedEmoji =
                range?.commonAncestorContainer;

              const isMessageInput =
                elementThatWasNextToTheInsertedEmoji?.nodeName === 'DIV';

              if (isMessageInput) {
                range?.insertNode(element);
              } else {
                const referenceElementForInsertingEmoji =
                  elementThatWasNextToTheInsertedEmoji?.parentElement
                    ?.nextSibling;
                // parentElement has been used because the emoji would be inserted after its textContext and now will be outside the tag
                // nextSibling is being used to insert the emoji after the reference element

                if (referenceElementForInsertingEmoji === undefined) return;

                messageInput.insertBefore(
                  element,
                  referenceElementForInsertingEmoji
                );
              }
            }

            range?.setStartAfter(element);
          };

          restoreOldMessageAndRestoreSelection();

          if (Array.isArray(twemoji)) {
            const getEmojisWithLinkCharacter = () => {
              const newTwemoji: TwemojiWithLinkCharacter = [];

              for (const index in twemoji) {
                const emoji = twemoji[index];

                newTwemoji.push(emoji);

                const isLast = twemoji.length - 1 === Number(index);

                if (isLast) continue;

                newTwemoji.push(linkCharacter);
              }

              return newTwemoji;
            };

            const emojis = getEmojisWithLinkCharacter();

            for (const char of emojis) {
              let element: HTMLSpanElement;

              if (char === linkCharacter) {
                element = document.createElement('span');
                element.textContent = linkCharacter;
              } else {
                element = getEmojiElement(char.text, char.url);
              }

              positionElement(element);
            }

            return;
          }

          const emojiElement = getEmojiElement(twemoji.text, twemoji.url);

          positionElement(emojiElement);
        };

        insertEmoji();

        break;
      }
    }

    const message = messageInput.innerHTML;

    setOldMessage(message);

    saveNewSelection();

    setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters(true);

    const timeNecessaryForPreventing = 0;

    setTimeout(() => {
      setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters(false);
    }, timeNecessaryForPreventing);
  }

  const defaultStyles: any = useStyleConfig('Textarea');

  return (
    <Box
      {...defaultStyles}
      borderRadius='10px'
      py='10.5px'
      fontFamily='Roboto, Noto Emoji, sans-serif'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
      contentEditable
      ref={ref}
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
          bgSize: 'contain',
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
      onInput={handleInput}
    />
  );
}
