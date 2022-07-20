import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useState } from 'react';
import Graphemer from 'graphemer';

type MessageInputEvent = { target: HTMLDivElement };

type SavedSel =
  | {
      start: number;
      end: number;
    }
  | undefined;

const splitter = new Graphemer();

function saveSelection(containerEl: HTMLDivElement) {
  const selection = getSelection();
  const range = selection?.getRangeAt(0);
  const preSelectionRange = range?.cloneRange();
  preSelectionRange?.selectNodeContents(containerEl);

  if (!range?.startContainer) return;

  preSelectionRange?.setEnd(range.startContainer, range?.startOffset);
  const start = preSelectionRange?.toString().length;

  if (!start) return;

  return {
    start: start,
    end: start + range.toString().length,
  };
}

function restoreSelection(containerEl: HTMLDivElement, savedSel: SavedSel) {
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
      if (!node.textContent || !savedSel) return;

      const nextCharIndex = charIndex + node.textContent.length;

      if (
        !foundStart &&
        savedSel?.start >= charIndex &&
        savedSel?.start <= nextCharIndex
      ) {
        range.setStart(node, savedSel?.start - charIndex);
        foundStart = true;
      }
      if (
        foundStart &&
        savedSel?.end >= charIndex &&
        savedSel?.end <= nextCharIndex
      ) {
        range.setEnd(node, savedSel?.end - charIndex);
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
  const [oldMessage, setOldMessage] = useState({
    innerHtml: '',
    textContent: '',
  });
  const [continueInputEvent, setContinueInputEvent] = useState(true);
  const [savedSel, setSavedSel] = useState<SavedSel>();

  async function handleInput(e: MessageInputEvent) {
    if (!continueInputEvent) {
      e.target.innerHTML = oldMessage.innerHtml;

      restoreSelection(e.target, savedSel);

      return;
    }

    const message = e.target.textContent ?? '';

    const messageChars = splitter.splitGraphemes(message);
    const oldMessageChars = splitter.splitGraphemes(oldMessage.textContent);

    const newValue = messageChars.find(
      (char, i) => char !== oldMessageChars[i]
    );

    if (!newValue) return;

    const { regexs } = await import('../../../../../utils/regexs');

    const isEmoji = regexs.emoji.test(newValue);

    if (isEmoji) {
      const { parse: twemojiParse } = await import('twemoji-parser');

      const emojiUrl = twemojiParse(newValue)[0].url;

      const emojiHtml = document.createElement('span');

      emojiHtml.className = 'emoji';
      emojiHtml.style.backgroundImage = `url(${emojiUrl})`;
      emojiHtml.textContent = newValue;

      e.target.innerHTML = oldMessage.innerHtml;

      if (!e.target.innerHTML) {
        e.target.append(emojiHtml);

        setSavedSel({
          end: 2,
          start: 2,
        });
      }

      restoreSelection(e.target, savedSel);

      console.log(getSelection()?.focusOffset);

      console.log(e.target.childNodes[0]);
    }

    const messageHtml = e.target.innerHTML;

    setOldMessage({
      textContent: message,
      innerHtml: messageHtml,
    });

    // it is for the event not to run 2 times when inserting an emoji
    setContinueInputEvent(false);

    setTimeout(() => {
      setContinueInputEvent(true);
    }, 0);
  }

  const defaultStyles: any = useStyleConfig('Textarea');

  return (
    <Box
      {...defaultStyles}
      borderRadius='10px'
      py='10.5px'
      fontFamily='Roboto'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
      contentEditable
      h='auto'
      minH='0'
      maxH={['200.5px']}
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
          bgSize: 'contain',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          color: 'transparent',
          caretColor: 'var(--chakra-colors-gray-50)',
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
