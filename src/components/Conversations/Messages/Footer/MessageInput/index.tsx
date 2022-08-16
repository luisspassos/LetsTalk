import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { FormEvent, useRef, useState } from 'react';
import Graphemer from 'graphemer';

type SelectionPosition =
  | {
      start: number;
      end: number;
    }
  | undefined;

type NativeEvent = Event & {
  data: string;
};

type SavedSelection = {
  wasCollapsed: boolean | undefined;
  position: SelectionPosition;
};

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
  savedSelection: SelectionPosition
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

  async function handleInput(e: FormEvent<HTMLDivElement>) {
    const nativeEvent = e.nativeEvent as NativeEvent;
    const newValue = nativeEvent.data;

    if (!newValue || !messageInput) return;

    if (preventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters) {
      messageInput.innerHTML = oldMessage;

      return;
    }

    const newValueCharacters = graphemer.splitGraphemes(newValue);

    const { regexs } = await import('../../../../../utils/regexs');

    for (const char of newValueCharacters) {
      const isEmoji = regexs.emoji.test(char);

      if (isEmoji) {
        const { parse: twemojiParse } = await import('twemoji-parser');
        const twemoji = twemojiParse(newValue)[0];

        const twemojiElement = document.createElement('span');
        twemojiElement.className = 'emoji';
        twemojiElement.textContent = twemoji.text;
        twemojiElement.style.backgroundImage = `url(${twemoji.url})`;

        const selection = getSelection();
        const range = selection?.getRangeAt(0);

        messageInput.innerHTML = oldMessage;

        range?.insertNode(twemojiElement);

        selection?.collapseToEnd();
      }
    }

    const message = messageInput.innerHTML;

    setOldMessage(message);

    const newSavedSelection = saveSelection(messageInput);

    setSavedSelection(newSavedSelection);

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
      // onKeyDown={handleKeyDown}
    />
  );
}
