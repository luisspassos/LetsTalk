import { Center } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useMessageInputRef } from '../../../../../../../../contexts/MessageInputRef';
import { EmojiType } from '../../../../../../../../utils/types';

type EmojiProps = {
  emoji: string;
};

export function Emoji({ emoji }: EmojiProps) {
  const { ref: messageInputRef } = useMessageInputRef();

  const {
    categories: { setState: setCategories, data: categories },
  } = useEmoji();

  function handleAddEmojiInRecentCategory() {
    const categoriesDataClone = [...categories.data];

    const newCategoriesData = categoriesDataClone.map((category) => {
      const returnCategoriesData = (categoryEmojis: EmojiType[]) => ({
        ...category,
        emojis: [emoji, ...categoryEmojis],
      });

      if (category.name !== 'Recentes') return category;

      const emojiExists = category.emojis.some(
        (categoryEmoji) => emoji === categoryEmoji
      );

      if (emojiExists) {
        const categoryEmojisFiltered = category.emojis.filter(
          (categoryEmoji) => categoryEmoji !== emoji
        );

        return returnCategoriesData(categoryEmojisFiltered);
      }

      if (category.emojis.length === 25) {
        category.emojis.pop();
      }

      return returnCategoriesData(category.emojis);
    });

    const recentlyUsedEmojis = newCategoriesData[0].emojis;

    localStorage.setItem(
      'recentlyUsedEmojis',
      JSON.stringify(recentlyUsedEmojis)
    );

    setCategories((prevState) => ({
      ...prevState,
      data: newCategoriesData,
    }));
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

    function handleInputSize() {
      input?.dispatchEvent(new Event('change', { bubbles: true }));
    }

    handleInputSize();
  }

  function handleDisableFocusOnClick(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <Center
      onMouseDown={handleDisableFocusOnClick}
      onClick={() => {
        handleInsertEmoji();
        handleAddEmojiInRecentCategory();
      }}
      as='li'
      fontSize={['22px', '25px', '28px']}
      w={['36px', '41px', '46px']}
      h={['36px', '41px', '46px']}
      cursor='pointer'
      borderRadius='8px'
      _hover={{
        bgColor: 'whiteAlpha.400',
      }}
    >
      {emoji}
    </Center>
  );
}
