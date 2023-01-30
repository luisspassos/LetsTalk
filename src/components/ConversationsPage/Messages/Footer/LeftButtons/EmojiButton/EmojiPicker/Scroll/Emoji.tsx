import { MouseEvent as ReactMouseEvent, useState } from 'react';
import {
  createRecentCategory,
  useCategories,
} from 'contexts/EmojiPicker/CategoriesContext';
import { useEmojiStyles } from 'contexts/EmojiPicker/EmojiStylesContext';
import { useMessageInputRef } from 'contexts/MessageInputRef';
import { useSetMessageInputSize } from 'hooks/useSetMessageInputSize';
import { useColorModeValue } from '@chakra-ui/react';

type EmojiProps = {
  children: string;
};

type MouseDownEvent = ReactMouseEvent<HTMLSpanElement, MouseEvent>;

function getValueWithMeasure(value: number) {
  return value + 'px';
}

export function Emoji({ children: emoji }: EmojiProps) {
  const { categories } = useCategories();

  const { emojiStyles } = useEmojiStyles();

  const { ref: messageInputRef } = useMessageInputRef();

  const { setMessageInputSize } = useSetMessageInputSize();

  const [hover, setHover] = useState(false);

  const styles = {
    size: getValueWithMeasure(emojiStyles.emojiSize),
    fontSize: getValueWithMeasure(emojiStyles.fontSize),
    bgColor: useColorModeValue(
      'var(--chakra-colors-blackAlpha-200)',
      'var(--chakra-colors-whiteAlpha-400)'
    ),
  };

  function handleAddEmojiInRecentCategory() {
    const categoriesData = [...categories.data];

    const recentCategoryExists = categoriesData[0].name === 'Recentes';

    if (!recentCategoryExists) {
      const addCategory = () => {
        const category = createRecentCategory();

        categoriesData.unshift(category);
      };

      addCategory();
    }

    const category = categoriesData[0];

    const emojiExists = category.emojis.includes(emoji);

    if (emojiExists) {
      // it will remove the existing emoji
      const emojis = category.emojis.filter(
        (categoryEmoji) => categoryEmoji !== emoji
      );

      // it will add the emoji in the first position
      emojis.unshift(emoji);

      category.emojis = emojis;
    } else {
      if (category.emojis.length === 25) {
        category.emojis.pop();
      }

      category.emojis.unshift(emoji);
    }

    localStorage.setItem('recentlyUsedEmojis', JSON.stringify(category.emojis));

    categories.set(categoriesData);
  }

  function handleInsertEmoji() {
    const input = messageInputRef.current;

    const isFocused = document.activeElement === input;

    if (!isFocused) input?.focus();

    const [start, end] = [
      input?.selectionStart,
      input?.selectionEnd,
    ] as number[];

    input?.setRangeText(emoji, start, end, 'end');

    setMessageInputSize();
  }

  function handleDisableFocusOnClick(e: MouseDownEvent) {
    e.preventDefault();
  }

  function handleAddHover() {
    setHover(true);
  }

  function handleRemoveHover() {
    setHover(false);
  }

  return (
    // chakra element isn't being used to perform the list

    <span
      style={{
        width: styles.size,
        height: styles.size,
        cursor: 'pointer',
        borderRadius: '8px',
        fontSize: styles.fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hover ? styles.bgColor : undefined,
      }}
      onClick={() => {
        handleInsertEmoji();
        handleAddEmojiInRecentCategory();
      }}
      onMouseDown={handleDisableFocusOnClick}
      onMouseEnter={handleAddHover}
      onMouseOut={handleRemoveHover}
    >
      {emoji}
    </span>
  );
}
