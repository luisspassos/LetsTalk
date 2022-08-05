import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Graphemer from 'graphemer';

type SavedSelection =
  | {
      start: number;
      end: number;
    }
  | undefined;

type ParentNodeType = {
  className: string;
} & ParentNode;

type ElementType = HTMLSpanElement | Text;

type SpecialEmojis = Record<
  string,
  {
    text: string;
    url: string;
  }
>;

const splitter = new Graphemer();

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

function insertAfter(newNode: ElementType, referenceNode: ParentNode | null) {
  referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

export function MessageInput() {
  const [oldMessage, setOldMessage] = useState({
    textContent: '',
    innerHtml: '',
  });
  const [savedSelection, setSavedSelection] = useState<SavedSelection>();
  const [continueInputEvent, setContinueInputEvent] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  useEffect(() => {
    // using addEventListener for prevent bugs

    let continueBeforeInputEvent = true;

    function handleBeforeInput() {
      if (!continueBeforeInputEvent || !messageInput) return;

      const newSavedSelection = saveSelection(messageInput);

      setSavedSelection(newSavedSelection);

      // this is so the event doesn't run twice
      continueBeforeInputEvent = false;

      setTimeout(() => {
        continueBeforeInputEvent = true;
      }, 0);
    }

    messageInput?.addEventListener('beforeinput', handleBeforeInput);

    return () => {
      messageInput?.removeEventListener('beforeinput', handleBeforeInput);
    };
  }, [messageInput]);

  async function handleInput() {
    if (!messageInput) return;

    if (!continueInputEvent) {
      messageInput.innerHTML = oldMessage.innerHtml;
      restoreSelection(messageInput, savedSelection);

      return;
    }

    const message = messageInput.textContent ?? '';

    const saveOldMessage = () => {
      const messageHtml = messageInput.innerHTML;

      setOldMessage({
        innerHtml: messageHtml,
        textContent: message,
      });
    };

    const insertValue = (value: ElementType) => {
      const selection = getSelection();

      const range = selection?.getRangeAt(0);

      range?.insertNode(value);

      const valueParentNode = value.parentNode as ParentNodeType;

      const isOutOfEmoji = valueParentNode.className !== 'emoji';

      if (!isOutOfEmoji) {
        const valueParentNodeChildren = [
          ...(valueParentNode?.childNodes ?? []),
        ].filter((child) => child.textContent);

        const newValueIndex = valueParentNodeChildren.findIndex(
          (child) => child === value
        );

        const newValuePosition = newValueIndex === 0 ? 'before' : 'after';

        value.remove();

        if (newValuePosition === 'before') {
          messageInput.insertBefore(value, valueParentNode);
        } else {
          insertAfter(value, valueParentNode);
        }
      }

      setCursorAfterLastValueInserted(value);
    };

    const setCursorAfterLastValueInserted = (value: ElementType) => {
      const selection = getSelection();

      const range = document.createRange();
      range.setStartAfter(value);

      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    const clearOldMessage = () => {
      messageInput.innerHTML = oldMessage.innerHtml;

      restoreSelection(messageInput, savedSelection);

      const selection = getSelection();

      selection?.deleteFromDocument();
    };

    const messageChars = splitter.splitGraphemes(message);
    const oldMessageChars = splitter.splitGraphemes(oldMessage.textContent);

    const newValue = messageChars.find(
      (char, i) => char !== oldMessageChars[i]
    );

    console.log(messageChars);
    console.log(oldMessageChars);
    console.log(newValue);

    if (!newValue) {
      if (!message) {
        messageInput.innerHTML = '';
      }

      saveOldMessage();
      return;
    }

    const { regexs } = await import('../../../../../utils/regexs');

    const isEmoji = regexs.emoji.test(newValue);

    if (isEmoji) {
      const { parse: twemojiParse } = await import('twemoji-parser');

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
        const twemoji = twemojiParse(newValue);
        const thereAreMoreEmojis = twemoji.length > 1;

        return thereAreMoreEmojis ? twemoji : twemoji[0];
      };

      const twemoji = specialEmojis[newValue] || getParsedEmoji();

      if (Array.isArray(twemoji)) {
        let emojis;

        const emojiHtmls = twemoji.map(({ text, url }) => {
          const emojiHtml = document.createElement('span');

          emojiHtml.className = 'emoji';
          emojiHtml.style.backgroundImage = `url(${url})`;
          emojiHtml.textContent = text;

          return emojiHtml;
        });

        const getEmojisWithLinkCharacter = () => {
          const newEmojiHtmls: HTMLSpanElement[] = [];

          emojiHtmls.forEach((html, i) => {
            newEmojiHtmls.push(html);

            const isLast = emojiHtmls.length - 1 === i;

            if (isLast) return;

            const linkCharacterHtml = document.createElement('span');

            // the character is invisible
            linkCharacterHtml.textContent = '‍';

            newEmojiHtmls.push(linkCharacterHtml);
          });

          return newEmojiHtmls;
        };

        const emojiIsNotComplete = twemoji.length > 1;

        if (emojiIsNotComplete) {
          emojis = getEmojisWithLinkCharacter();
        } else {
          emojis = emojiHtmls;
        }

        clearOldMessage();

        const collapsedSelection = {
          start: savedSelection?.start ?? 0,
          end: savedSelection?.start ?? 0,
        };

        restoreSelection(messageInput, collapsedSelection);

        emojis.forEach((emojiHtml) => {
          insertValue(emojiHtml);
        });
      } else {
        const emojiHtml = document.createElement('span');

        emojiHtml.className = 'emoji';
        emojiHtml.style.backgroundImage = `url(${twemoji.url})`;
        emojiHtml.textContent = twemoji.text;

        clearOldMessage();

        const collapsedSelection = {
          start: savedSelection?.start ?? 0,
          end: savedSelection?.start ?? 0,
        };

        restoreSelection(messageInput, collapsedSelection);

        insertValue(emojiHtml);
      }
    } else {
      const newValueHtml = document.createTextNode(newValue);

      clearOldMessage();

      insertValue(newValueHtml);
    }

    saveOldMessage();

    const newSavedSelection = saveSelection(messageInput);

    setSavedSelection(newSavedSelection);

    setContinueInputEvent(false);

    setTimeout(() => {
      setContinueInputEvent(true);
    }, 0);
  }

  // useEffect(() => {
  //   async function afterInputEvent() {
  //     if (!savedSelection || !messageInput) return;

  //     if (isKeyDownEvent) {
  //       setIsKeyDownEvent(false);
  //       return;
  //     }

  //     const message = messageInput?.textContent ?? '';

  //     const messageChars = splitter.splitGraphemes(message);
  //     const oldMessageChars = splitter.splitGraphemes(oldMessage.textContent);

  //     const newValue = messageChars.find(
  //       (char, i) => char !== oldMessageChars[i]
  //     );

  //     if (!newValue) return;

  //     const { regexs } = await import('../../../../../utils/regexs');

  //     const isEmoji = regexs.emoji.test(newValue);

  //     if (isEmoji) {
  //       const { parse: twemojiParse } = await import('twemoji-parser');

  //       const emojiUrl = twemojiParse(newValue)[0].url;

  //       const emojiHtml = document.createElement('span');

  //       emojiHtml.className = 'emoji';
  //       emojiHtml.style.backgroundImage = `url(${emojiUrl})`;
  //       emojiHtml.textContent = newValue;

  //       messageInput.innerHTML = oldMessage.innerHtml;

  //       restoreSelection(messageInput, savedSelection);

  //       const selection = getSelection();

  //       selection?.getRangeAt(0).insertNode(emojiHtml);

  //       const isTheFirstElement = oldMessage.textContent.length === 0;

  //       if (!isTheFirstElement) {
  //         const emojiParentNode = emojiHtml.parentNode;

  //         const emojiParentNodeChildren = [
  //           ...(emojiParentNode?.childNodes ?? []),
  //         ].filter((child) => child.textContent);

  //         const emojiIndex = emojiParentNodeChildren.findIndex(
  //           (child) => child === emojiHtml
  //         );

  //         const emojiPosition = emojiIndex === 0 ? 'before' : 'after';

  //         emojiHtml.remove();

  //         if (emojiPosition === 'before') {
  //           messageInput.insertBefore(emojiHtml, emojiParentNode);
  //         } else {
  //           insertAfter(emojiHtml, emojiParentNode);
  //         }
  //       }

  //       const range = document.createRange();
  //       range.setStartAfter(emojiHtml);

  //       selection?.removeAllRanges();
  //       selection?.addRange(range);
  //     }

  //     const messageHtml = messageInput.innerHTML;

  //     setOldMessage({
  //       textContent: message,
  //       innerHtml: messageHtml,
  //     });
  //   }

  //   afterInputEvent();
  // }, [savedSelection]);

  // function saveMessageInputSelection() {
  //   if (!messageInput) return;

  //   const newSavedSelection = saveSelection(messageInput);

  //   setSavedSelection(newSavedSelection);
  // }

  // const [continueBeforeInputEvent, setContinueBeforeInputEvent] =
  //   useState(true);

  // function handleBeforeInput() {
  //   if (!continueBeforeInputEvent) return;

  //   const range = getSelection()?.getRangeAt(0);

  //   console.log(range?.startOffset, range?.endOffset);

  //   setContinueBeforeInputEvent(false);

  //   setTimeout(() => {
  //     setContinueBeforeInputEvent(true);
  //   }, 0);
  // }

  // function handleKeyUp(e: KeyboardEvent<HTMLDivElement>) {
  //   const key = e.key;

  //   if (!(key === 'Delete' || key === 'Backspace')) return;

  //   const message = messageInput?.textContent ?? '';
  //   const messageHtml = messageInput?.innerHTML ?? '';

  //   setOldMessage({
  //     innerHtml: messageHtml,
  //     textContent: message,
  //   });

  //   setIsKeyDownEvent(true);

  //   saveMessageInputSelection();
  // }

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
