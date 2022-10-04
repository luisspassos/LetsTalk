import { Center, Image } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { parse as twemojiParse } from 'twemoji-parser';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useMessageInput } from '../../../../../../../../contexts/MessageInputContext';
import { EmojiType } from '../../../../../../../../utils/types';

type EmojiProps = {
  emoji: string;
  name: string;
};

export function Emoji({ emoji, name }: EmojiProps) {
  const {
    categories: { setState: setCategories, data: categories },
  } = useEmoji();

  const { messageInput } = useMessageInput();

  const twemoji = twemojiParse(emoji)[0].url;

  function handleSelectEmoji() {
    function addEmojiInRecentCategory() {
      const categoriesDataClone = [...categories.data];

      const newCategoriesData = categoriesDataClone.map((category) => {
        const returnCategoriesData = (categoryEmojis: EmojiType[]) => ({
          ...category,
          emojis: [
            {
              emoji,
              name,
            },
            ...categoryEmojis,
          ],
        });

        if (category.name !== 'Recentes') {
          return category;
        }

        const emojiExists = category.emojis.some(
          (emoji) => emoji.name === name
        );

        if (emojiExists) {
          const categoryEmojisFiltered = category.emojis.filter(
            ({ emoji: categoryEmoji }) => categoryEmoji !== emoji
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

    async function insertEmoji() {
      const messageInputIsFocused = messageInput === document.activeElement;

      const selection = getSelection();

      function putCursorAtTheEnd() {
        if (!messageInput) return;

        selection?.selectAllChildren(messageInput);
        selection?.collapseToEnd();
      }

      if (!messageInputIsFocused) {
        messageInput?.focus();

        putCursorAtTheEnd();
      }

      if (!selection?.isCollapsed) {
        selection?.deleteFromDocument();

        const { removeEmptySpans } = await import(
          '../../../../../../../../utils/removeEmptySpans'
        );

        removeEmptySpans(messageInput);
      }

      const { getTwemojiElement } = await import(
        '../../../../../../../../utils/getTwemojiElement'
      );

      const twemojiElement = getTwemojiElement(emoji, twemoji);

      const selectionRange = selection?.getRangeAt(0);

      const { positionSelectionIfValueHasBeenPlacedCloseToAnEmoji } =
        await import(
          '../../../../../../../../utils/positionSelectionIfValueHasBeenPlacedCloseToAnEmoji'
        );

      positionSelectionIfValueHasBeenPlacedCloseToAnEmoji(
        selection,
        selectionRange
      );

      selectionRange?.insertNode(twemojiElement);
      selection?.collapseToEnd();
    }

    insertEmoji();
    addEmojiInRecentCategory();
  }

  function handleDisableFocusOnClick(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <Center as='li' w={['36px', '41px', '46px']} h={['36px', '41px', '46px']}>
      <Image
        cursor='pointer'
        onClick={handleSelectEmoji}
        onMouseDown={handleDisableFocusOnClick}
        w='70%'
        h='70%'
        src={twemoji}
        alt={emoji}
        aria-label={name}
      />
    </Center>
  );
}
