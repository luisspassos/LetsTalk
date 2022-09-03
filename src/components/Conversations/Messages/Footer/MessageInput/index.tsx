import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Graphemer from 'graphemer';

type Emoji = {
  text: string;
  url: string;
};

type SpecialEmojis = Record<string, Emoji>;

type EmojiOrEmojis = string | Emoji | Emoji[];

type SavedSelection =
  | {
      start: number;
      end: number;
    }
  | undefined;

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
  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  useEffect(() => {
    async function handleDropAndPaste(e: InputEvent) {
      if (!e.dataTransfer) return;

      const newValueTypes = e.dataTransfer.types;

      const doesNotHaveHtml =
        newValueTypes.length === 1 && newValueTypes[0] === 'text/plain';

      const dataTransfer = e.dataTransfer.getData('text');

      if (doesNotHaveHtml) return;

      e.preventDefault();

      const isPaste = e.dataTransfer.effectAllowed === 'uninitialized';

      const selection = getSelection();

      if (isPaste && !selection?.isCollapsed) selection?.deleteFromDocument();

      const textNode = document.createTextNode(dataTransfer);

      const selectionRange = selection?.getRangeAt(0);

      selectionRange?.insertNode(textNode);

      if (isPaste) selection?.collapseToEnd();
    }

    let oldMessage = '';
    let savedSelection: SavedSelection;
    let preventInputEventFromRunningTwice = false;

    async function handleEmojis() {
      if (!messageInput) return;

      const setMessageAndRestoreSelection = (message: string) => {
        messageInput.innerHTML = message;
        restoreSelection(messageInput, savedSelection);
      };

      if (preventInputEventFromRunningTwice) {
        setMessageAndRestoreSelection(oldMessage);

        return;
      }

      const newSavedSelection = saveSelection(messageInput);

      savedSelection = newSavedSelection;

      const message = messageInput.textContent ?? '';

      const graphemer = new Graphemer();

      const chars = graphemer.splitGraphemes(message);

      const { regexs } = await import('../../../../../utils/regexs');
      const { parse } = await import('twemoji-parser');

      const getEmoji = (char: string) => {
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

        const getParsedEmoji = () => {
          const twemoji = parse(char);

          const emojiOrEmojis = twemoji.length > 1 ? twemoji : twemoji[0];

          return twemoji.length > 0 ? emojiOrEmojis : char;
        };

        const emojiOrEmojis = (specialEmojis[char] ??
          getParsedEmoji()) as EmojiOrEmojis;

        const getElement = (text: string, url: string) =>
          `<span class='emoji' style='background-image: url(${url})'>${text}</span>`;

        let element = '';

        if (Array.isArray(emojiOrEmojis)) {
          for (const index in emojiOrEmojis) {
            const twemoji = emojiOrEmojis[index];

            element += getElement(twemoji.text, twemoji.url);

            const isLast = emojiOrEmojis.length - 1 === Number(index);

            if (isLast) break;

            // the link character is invisible
            const linkCharacter = '‍';

            element += linkCharacter;
          }
        } else if (typeof emojiOrEmojis === 'string') {
          element = emojiOrEmojis;
        } else {
          element = getElement(emojiOrEmojis.text, emojiOrEmojis.url);
        }

        return element;
      };

      const newChars = chars.map((char) => {
        const specialChars: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
        };

        const specialChar = specialChars[char];

        if (specialChar) return specialChar;

        const isEmoji = regexs.emoji.test(char);

        if (isEmoji) return getEmoji(char);

        return char;
      });

      const newMessage = newChars.join('');

      setMessageAndRestoreSelection(newMessage);

      oldMessage = newMessage;

      preventInputEventFromRunningTwice = true;

      setTimeout(() => {
        preventInputEventFromRunningTwice = false;
      }, 0);
    }

    messageInput?.addEventListener('beforeinput', handleDropAndPaste);
    messageInput?.addEventListener('input', handleEmojis);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleDropAndPaste);
      messageInput?.removeEventListener('input', handleEmojis);
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
          bgPos: 'center',
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
