import { memo, MouseEvent as ReactMouseEvent, useState } from 'react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useMessageInputRef } from '../../../../../../../../contexts/MessageInputRef';

type EmojiProps = {
  children: string;
};

type MouseDownEvent = ReactMouseEvent<HTMLSpanElement, MouseEvent>;

function getValueWithMeasure(value: number) {
  return value + 'px';
}

function EmojiComponent({ children: emoji }: EmojiProps) {
  const { emojiPickerStyles } = useEmoji();
  const { ref: messageInputRef } = useMessageInputRef();

  const [hover, setHover] = useState(false);

  const styles = {
    size: getValueWithMeasure(emojiPickerStyles.emojiSize),
    fontSize: getValueWithMeasure(emojiPickerStyles.fontSize),
  };

  // const { ref: messageInputRef } = useMessageInputRef();

  // const {
  //   categories: { setState: setCategories, data: categories },
  // } = useEmoji();

  // function handleAddEmojiInRecentCategory() {
  //   const categoriesData = [...categories.data];

  //   const recentCategoryExists = categoriesData[0].name === 'Recentes';

  //   if (!recentCategoryExists) {
  //     const addCategory = () => {
  //       const category = createRecentCategory();

  //       categoriesData.unshift(category);
  //     };

  //     addCategory();
  //   }

  //   const category = categoriesData[0];

  //   const emojiExists = category.emojis.includes(emoji);

  //   if (emojiExists) {
  //     // it will remove the existing emoji
  //     const emojis = category.emojis.filter(
  //       (categoryEmoji) => categoryEmoji !== emoji
  //     );

  //     // it will add the emoji in the first position
  //     emojis.unshift(emoji);

  //     category.emojis = emojis;
  //   } else {
  //     if (category.emojis.length === 25) {
  //       category.emojis.pop();
  //     }

  //     category.emojis.unshift(emoji);
  //   }

  //   localStorage.setItem('recentlyUsedEmojis', JSON.stringify(category.emojis));

  //   // setCategories((prevState) => ({
  //   //   ...prevState,
  //   //   data: categoriesData,
  //   // }));
  // }

  function handleInsertEmoji() {
    const input = messageInputRef.current;

    const isFocused = document.activeElement === input;

    if (!isFocused) input?.focus();

    const [start, end] = [
      input?.selectionStart,
      input?.selectionEnd,
    ] as number[];

    input?.setRangeText(emoji, start, end, 'end');

    function handleInputSize() {
      input?.dispatchEvent(new Event('change', { bubbles: true }));
    }

    handleInputSize();
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
        backgroundColor: hover
          ? 'var(--chakra-colors-whiteAlpha-400)'
          : undefined,
      }}
      onClick={handleInsertEmoji}
      onMouseDown={handleDisableFocusOnClick}
      onMouseEnter={handleAddHover}
      onMouseOut={handleRemoveHover}
    >
      {emoji}
    </span>
    // <Center
    //   onMouseDown={handleDisableFocusOnClick}
    //   onClick={() => {
    //     handleInsertEmoji();
    //     // handleAddEmojiInRecentCategory();
    //   }}
    //   as='li'
    //   fontSize={['22px', '25px', '28px']}
    //   w={measure}
    //   h={measure}
    //   cursor='pointer'
    //   borderRadius='8px'
    //   _hover={{
    //     bgColor: 'whiteAlpha.400',
    //   }}
    // >
    //   {emoji}
    // </Center>
  );
}

export const Emoji = memo(EmojiComponent);
