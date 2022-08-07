import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Graphemer from 'graphemer';

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

type SelectionPosition = {
  offset: number | undefined;
  container: Node | undefined;
};

type SavedSelection = {
  end: SelectionPosition;
  start: SelectionPosition;
};

const splitter = new Graphemer();

function insertAfter(newNode: ElementType, referenceNode: ParentNode | null) {
  referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

export function MessageInput() {
  const [oldMessage, setOldMessage] = useState({
    textContent: '',
    innerHtml: '',
  });
  const [continueInputEvent, setContinueInputEvent] = useState(true);
  const [somethingInMessageWasDeleted, setSomethingInMessageWasDeleted] =
    useState(false);
  const [savedSelection, setSavedSelection] = useState<SavedSelection>();

  const ref = useRef<HTMLDivElement>(null);
  const messageInput = ref.current;

  const saveSelection = () => {
    const selection = getSelection();
    const range = selection?.getRangeAt(0);

    const newSavedSelection = {
      start: {
        offset: range?.startOffset,
        container: range?.startContainer,
      },
      end: {
        offset: range?.endOffset,
        container: range?.endContainer,
      },
    };

    setSavedSelection(newSavedSelection);

    return {
      start: {
        offset: range?.startOffset,
        container: range?.startContainer.textContent,
      },
      end: {
        offset: range?.endOffset,
        container: range?.endContainer.textContent,
      },
    };
  };

  const restoreSelection = () => {
    const selection = getSelection();

    if (
      !savedSelection?.start.container ||
      !savedSelection?.start.offset ||
      !savedSelection?.end.container ||
      !savedSelection?.end.offset
    ) {
      return;
    }

    selection?.setBaseAndExtent(
      savedSelection?.start.container,
      savedSelection?.start.offset,
      savedSelection?.end.container,
      savedSelection?.end.offset
    );

    return {
      a: savedSelection?.start.container.textContent,
      b: savedSelection?.start.container.className,
      c: savedSelection?.start.offset,
      d: savedSelection?.end.container.className,
      e: savedSelection?.end.container.textContent,
      f: savedSelection?.end.offset,
    };
  };

  useEffect(() => {
    // using addEventListener for prevent bugs

    let continueBeforeInputEvent = true;

    function handleBeforeInput() {
      if (!continueBeforeInputEvent || !messageInput) return;

      // console.log(saveSelection());

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
    console.log(savedSelection?.start.container?.textContent);

    if (!messageInput) return;

    if (!continueInputEvent) {
      messageInput.innerHTML = oldMessage.innerHtml;

      restoreSelection();

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

    if (somethingInMessageWasDeleted) {
      setSomethingInMessageWasDeleted(false);

      if (!message) {
        messageInput.innerHTML = '';
      }

      saveOldMessage();

      return;
    }

    const setCursorAfterLastValueInserted = (value: ElementType) => {
      const selection = getSelection();

      const range = document.createRange();
      range.setStartAfter(value);

      selection?.removeAllRanges();
      selection?.addRange(range);
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

    const restoreOldMessageByDeletingSelectedText = () => {
      messageInput.innerHTML = oldMessage.innerHtml;

      // restoreSelection();

      // const selection = getSelection();

      // selection?.deleteFromDocument();
    };

    const messageChars = splitter.splitGraphemes(message);
    const oldMessageChars = splitter.splitGraphemes(oldMessage.textContent);

    const newValue = messageChars.find(
      (char, i) => char !== oldMessageChars[i]
    );

    if (!newValue) {
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

      const getEmojiHtml = (text: string, url: string) => {
        const emojiHtml = document.createElement('span');

        emojiHtml.className = 'emoji';
        emojiHtml.style.backgroundImage = `url(${url})`;
        emojiHtml.textContent = text;

        return emojiHtml;
      };

      const positionCollapsedSelection = () => {
        restoreOldMessageByDeletingSelectedText();

        // console.log(
        //   savedSelection?.start.container?.textContent,
        //   savedSelection?.start.offset,
        //   savedSelection?.end.container?.textContent,
        //   savedSelection?.end.offset
        // );

        restoreSelection();
      };

      if (Array.isArray(twemoji)) {
        let emojis;

        const emojiHtmls = twemoji.map(({ text, url }) => {
          const emojiHtml = getEmojiHtml(text, url);

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

        positionCollapsedSelection();

        emojis.forEach((emojiHtml) => {
          insertValue(emojiHtml);
        });
      } else {
        const emojiHtml = getEmojiHtml(twemoji.text, twemoji.url);

        positionCollapsedSelection();

        insertValue(emojiHtml);
      }
    } else {
      const newValueHtml = document.createTextNode(newValue);

      restoreOldMessageByDeletingSelectedText();

      insertValue(newValueHtml);
    }

    saveOldMessage();
    saveSelection();

    // this is to fix the duplicate emojis bug
    setContinueInputEvent(false);

    setTimeout(() => {
      setContinueInputEvent(true);
    }, 0);
  }

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    const message = messageInput?.textContent;

    if ((key === 'Delete' || key === 'Backspace') && message) {
      setSomethingInMessageWasDeleted(true);
    }
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
      onKeyDown={handleKeyDown}
    />
  );
}
