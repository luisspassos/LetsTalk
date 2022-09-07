import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect } from 'react';
import Graphemer from 'graphemer';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRefContext';
import { colors } from '../../../../../styles/colors';

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

type Events = { type: string; func: () => {} }[];

type Styles = {
  default: any;
  HSpacing: string;
};

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
  const ref = useMessageInputRef();

  useEffect(() => {
    const messageInput = ref.current;

    let savedSelection: SavedSelection;

    const setMessageAndRestoreSelection = (message: string) => {
      if (!messageInput) return;

      messageInput.innerHTML = message;
      restoreSelection(messageInput, savedSelection);
    };

    const lineBreaks = ['\r\n', '\r', '\n'];

    async function handleEmojis() {
      if (!messageInput) return;

      const newSavedSelection = saveSelection(messageInput);

      savedSelection = newSavedSelection;

      const innerText = messageInput.innerText ?? '';
      const textContent = messageInput.textContent ?? '';

      const graphemer = new Graphemer();

      const textContentChars = graphemer.splitGraphemes(textContent);
      const innerTextChars = graphemer.splitGraphemes(innerText);

      const thereAreBlankSpacesAtTheEnd;

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

        const thereIsNotTwemoji = typeof emojiOrEmojis === 'string';

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
        } else if (thereIsNotTwemoji) {
          element = emojiOrEmojis;
        } else {
          element = getElement(emojiOrEmojis.text, emojiOrEmojis.url);
        }

        return element;
      };

      const newChars = chars.map((char) => {
        if (lineBreaks.includes(char)) return '<p>';

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

      return newMessage;
    }

    function cleanUpHtmlRestIfAny() {
      if (!messageInput) return;

      const message = messageInput.textContent;
      const messageHtml = messageInput.innerHTML;

      if (!message && messageHtml) messageInput.innerHTML = '';
    }

    async function handleDropAndPasteAndBackspaceDeletionAndEmojis(
      e: InputEvent
    ) {
      const selection = getSelection();

      function handleBackspaceDeletion() {
        const selectionElement = selection?.anchorNode;

        const isBackspace = e.inputType === 'deleteContentBackward';
        const anEmojiWillBeDeleted =
          selectionElement?.parentElement?.className === 'emoji';

        if (isBackspace && anEmojiWillBeDeleted && selection?.isCollapsed) {
          e.preventDefault();

          const emoji = selectionElement?.parentElement;

          const nodeThatWillReceiveTheSelection =
            emoji.previousSibling?.firstChild;

          const selectionPosition =
            nodeThatWillReceiveTheSelection?.textContent?.length;

          if (nodeThatWillReceiveTheSelection) {
            selection?.setPosition(
              nodeThatWillReceiveTheSelection,
              selectionPosition
            );
          }

          emoji.remove();

          cleanUpHtmlRestIfAny();
        }
      }

      handleBackspaceDeletion();

      if (!e.dataTransfer) return;

      e.preventDefault();

      isPaste = e.dataTransfer.effectAllowed === 'uninitialized';

      if (isPaste && !selection?.isCollapsed) selection?.deleteFromDocument();

      const dataTransfer = e.dataTransfer.getData('text');

      function standardizeLineBreaks(string: string) {
        for (const lineBreak of lineBreaks) {
          string = string.replaceAll(lineBreak, '<br>');
        }

        return string;
      }

      const newDataTransfer = standardizeLineBreaks(dataTransfer);

      const textParent = document.createElement('template');
      textParent.innerHTML = newDataTransfer;

      const text = textParent.content;

      const selectionRange = selection?.getRangeAt(0);

      selectionRange?.insertNode(text);

      if (isPaste) selection?.collapseToEnd();

      handleEmojis();
    }

    let oldMessage = '';
    let preventInputEventFromRunningTwice = false;

    async function handleNativeEmojiPicker(event: InputEvent) {
      const newValue = event.data;

      if (!newValue) {
        cleanUpHtmlRestIfAny();

        return;
      }

      if (preventInputEventFromRunningTwice) {
        setMessageAndRestoreSelection(oldMessage);

        return;
      }

      const newMessage = (await handleEmojis()) ?? '';

      oldMessage = newMessage;

      preventInputEventFromRunningTwice = true;

      setTimeout(() => {
        preventInputEventFromRunningTwice = false;
      }, 0);
    }

    function handleDisableKeyboardShortcuts(e: KeyboardEvent) {
      const key = e.key;

      const keys = ['u', 'b', 'i'];

      if ((e.metaKey || e.ctrlKey) && keys.includes(key)) {
        e.preventDefault();
      }
    }

    const events = [
      {
        type: 'beforeinput',
        func: handleDropAndPasteAndBackspaceDeletionAndEmojis,
      },
      {
        type: 'input',
        func: handleNativeEmojiPicker,
      },
      {
        type: 'keydown',
        func: handleDisableKeyboardShortcuts,
      },
    ] as Events;

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
