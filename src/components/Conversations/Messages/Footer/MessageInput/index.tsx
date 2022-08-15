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

function insertAfter(newNode: ElementType, referenceNode: ParentNode | null) {
  referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

export function MessageInput() {
  const [oldMessage, setOldMessage] = useState('');
  const [savedSelection, setSavedSelection] = useState<SavedSelection>();
  const [somethingInMessageWasDeleted, setSomethingInMessageWasDeleted] =
    useState(false);
  const [
    preventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters,
    setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters,
  ] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  // useEffect(() => {
  //   let continueBeforeInputEvent = true;

  //   function handleBeforeInput() {
  //     if (!continueBeforeInputEvent || !messageInput) return;

  //     const selection = getSelection();
  //     const selectionIsCollapsed = selection?.isCollapsed;

  //     selection?.deleteFromDocument();

  //     const message = messageInput.textContent ?? '';

  //     if (!message) {
  //       messageInput.innerHTML = '';

  //       setSomethingInMessageWasDeleted(false);
  //     }

  //     const messageHtml = messageInput.innerHTML;

  //     setOldMessage({
  //       innerHtml: messageHtml,
  //       textContent: message,
  //     });

  //     const newSavedSelection = saveSelection(messageInput);

  //     setSavedSelection({
  //       position: newSavedSelection,
  //       wasCollapsed: selectionIsCollapsed,
  //     });

  //     // this is so the event doesn't run twice
  //     continueBeforeInputEvent = false;

  //     setTimeout(() => {
  //       continueBeforeInputEvent = true;
  //     }, 0);
  //   }

  //   // using addEventListener for prevent bugs
  //   messageInput?.addEventListener('beforeinput', handleBeforeInput);

  //   return () => {
  //     messageInput?.removeEventListener('beforeinput', handleBeforeInput);
  //   };
  // }, [messageInput]);

  // useEffect is being used to prevent duplicate values that would be inserted by handleInput func

  async function handleInput(e: FormEvent<HTMLDivElement>) {
    const nativeEvent = e.nativeEvent as NativeEvent;
    const newValue = nativeEvent.data;

    if (
      !newValue ||
      !messageInput ||
      preventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters
    )
      return;

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

    setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters(true);
    // read about to and for
    const timeNecessaryToPrevent = 0;
    setTimeout(() => {
      setPreventTheInputEventFromExecutingTwiceBecauseOfSomeCharacters(false);
    }, 0);

    // if (!messageInput) return;
    // const message = messageInput.textContent ?? '';
    // if (!message) {
    //   messageInput.innerHTML = '';
    // }
    // const saveOldMessage = () => {
    //   const messageHtml = messageInput.innerHTML;
    //   const message = messageInput.textContent ?? '';
    //   setOldMessage({
    //     innerHtml: messageHtml,
    //     textContent: message,
    //   });
    // };
    // if (somethingInMessageWasDeleted) {
    //   setSomethingInMessageWasDeleted(false);
    //   saveOldMessage();
    //   return;
    // }
    // const setCursorAfterLastValueInserted = (value: ElementType) => {
    //   const selection = getSelection();
    //   const range = document.createRange();
    //   range.setStartAfter(value);
    //   selection?.removeAllRanges();
    //   selection?.addRange(range);
    // };
    // const insertValue = (value: ElementType) => {
    //   const selection = getSelection();
    //   const range = selection?.getRangeAt(0);
    //   range?.insertNode(value);
    //   const valueParentNode = value.parentNode as ParentNodeType;
    //   const isOutOfEmoji = valueParentNode.className !== 'emoji';
    //   if (!isOutOfEmoji) {
    //     const valueParentNodeChildren = [
    //       ...(valueParentNode?.childNodes ?? []),
    //     ].filter((child) => child.textContent);
    //     const newValueIndex = valueParentNodeChildren.findIndex(
    //       (child) => child === value
    //     );
    //     const newValuePosition = newValueIndex === 0 ? 'before' : 'after';
    //     value.remove();
    //     if (newValuePosition === 'before') {
    //       messageInput.insertBefore(value, valueParentNode);
    //     } else {
    //       insertAfter(value, valueParentNode);
    //     }
    //   }
    //   setCursorAfterLastValueInserted(value);
    // };
    // const restoreOldMessageByDeletingSelectedText = () => {
    //   messageInput.innerHTML = oldMessage.innerHtml;
    //   restoreSelection(messageInput, savedSelection?.position);
    //   const selection = getSelection();
    //   selection?.deleteFromDocument();
    // };
    // const messageChars = [...message];
    // const oldMessageChars = [...oldMessage.textContent];
    // for (const key in messageChars) {
    //   const newKey = Number(key);
    //   const messageChar = messageChars[newKey];
    //   const oldMessageChar = oldMessageChars[newKey];
    //   if (messageChar !== oldMessageChar) {
    //     oldMessageChars.splice(newKey, 0, 'fill empty space');
    //   }
    // }
    // const newValue = messageChars
    //   .filter((char, i) => char !== oldMessageChars[i])
    //   .join('');
    // if (!newValue) {
    //   saveOldMessage();
    //   return;
    // }
    // const { regexs } = await import('../../../../../utils/regexs');
    // const isEmoji = regexs.emoji.test(newValue);
    // if (isEmoji) {
    //   // if the selection was collapsed, the event ran twice
    //   // this is so the event doesn't run twice with some emoji
    //   if (!continueInputEvent && savedSelection?.wasCollapsed) {
    //     setContinueInputEvent(true);
    //     return;
    //   }
    //   setContinueInputEvent(false);
    //   const { parse: twemojiParse } = await import('twemoji-parser');
    //   const specialEmojis: SpecialEmojis = {
    //     '👁️‍🗨️': {
    //       text: '👁️‍🗨️',
    //       url: 'https://twemoji.maxcdn.com/v/latest/svg/1f441-200d-1f5e8.svg',
    //     },
    //     '♾️': {
    //       text: '♾️',
    //       url: 'https://twemoji.maxcdn.com/v/latest/svg/267e.svg',
    //     },
    //   };
    //   const getParsedEmoji = () => {
    //     const twemoji = twemojiParse(newValue);
    //     const thereAreMoreEmojis = twemoji.length > 1;
    //     return thereAreMoreEmojis ? twemoji : twemoji[0];
    //   };
    //   const twemoji = specialEmojis[newValue] || getParsedEmoji();
    //   const getEmojiHtml = (text: string, url: string) => {
    //     const emojiHtml = document.createElement('span');
    //     emojiHtml.className = 'emoji';
    //     emojiHtml.style.backgroundImage = `url(${url})`;
    //     emojiHtml.textContent = text;
    //     return emojiHtml;
    //   };
    //   const positionCollapsedSelection = () => {
    //     restoreOldMessageByDeletingSelectedText();
    //     const collapsedSelection = {
    //       start: savedSelection?.position?.start ?? 0,
    //       end: savedSelection?.position?.start ?? 0,
    //     };
    //     restoreSelection(messageInput, collapsedSelection);
    //   };
    //   if (Array.isArray(twemoji)) {
    //     let emojis;
    //     const emojiHtmls = twemoji.map(({ text, url }) => {
    //       const emojiHtml = getEmojiHtml(text, url);
    //       return emojiHtml;
    //     });
    //     const getEmojisWithLinkCharacter = () => {
    //       const newEmojiHtmls: HTMLSpanElement[] = [];
    //       emojiHtmls.forEach((html, i) => {
    //         newEmojiHtmls.push(html);
    //         const isLast = emojiHtmls.length - 1 === i;
    //         if (isLast) return;
    //         const linkCharacterHtml = document.createElement('span');
    //         // the link character is invisible
    //         linkCharacterHtml.textContent = '‍';
    //         newEmojiHtmls.push(linkCharacterHtml);
    //       });
    //       return newEmojiHtmls;
    //     };
    //     const emojiIsNotComplete = twemoji.length > 1;
    //     if (emojiIsNotComplete) {
    //       emojis = getEmojisWithLinkCharacter();
    //     } else {
    //       emojis = emojiHtmls;
    //     }
    //     positionCollapsedSelection();
    //     emojis.forEach((emojiHtml) => {
    //       insertValue(emojiHtml);
    //     });
    //   } else {
    //     const emojiHtml = getEmojiHtml(twemoji.text, twemoji.url);
    //     positionCollapsedSelection();
    //     insertValue(emojiHtml);
    //   }
    // } else {
    //   // this is so the event doesn't run twice with some characters type
    //   if (!continueInputEvent) {
    //     setContinueInputEvent(true);
    //     return;
    //   }
    //   setContinueInputEvent(false);
    //   const newValueHtml = document.createTextNode(newValue);
    //   restoreOldMessageByDeletingSelectedText();
    //   insertValue(newValueHtml);
    // }
    // saveOldMessage();
    // const newSavedSelection = saveSelection(messageInput);
    // setSavedSelection({
    //   wasCollapsed: false,
    //   position: newSavedSelection,
    // });
  }

  // function handleKeyDown(e: KeyboardEvent) {
  //   // const key = e.key;
  //   // const message = messageInput?.textContent;
  //   // if ((key === 'Delete' || key === 'Backspace') && message) {
  //   //   setSomethingInMessageWasDeleted(true);
  //   // }
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
      // onKeyDown={handleKeyDown}
    />
  );
}
