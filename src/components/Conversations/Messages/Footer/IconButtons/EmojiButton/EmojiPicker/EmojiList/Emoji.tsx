import { Center, Image } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { parse as twemojiParse } from 'twemoji-parser';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useMessageInputRef } from '../../../../../../../../contexts/MessageInputRefContext';
import { EmojiType } from '../../../../../../../../utils/types';

type EmojiProps = {
  emoji: string;
  name: string;
};

export function Emoji({ emoji, name }: EmojiProps) {
  const {
    categories: { setState: setCategories, data: categories },
  } = useEmoji();

  const messageInputRef = useMessageInputRef();

  const twemoji =
    emoji === '👁️‍🗨️'
      ? 'https://raw.githubusercontent.com/twitter/twemoji/ad3d3d669bb3697946577247ebb15818f09c6c91/assets/svg/1f441-200d-1f5e8.svg'
      : twemojiParse(emoji)[0].url;

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

    function insertEmoji() {
      const messageInput = messageInputRef.current;

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

      const emojiElement = document.createElement('span');
      emojiElement.textContent = emoji;
      emojiElement.className = 'emoji';
      emojiElement.style.backgroundImage = `url(${twemoji})`;

      const emojiHasBeenPlacedNextToAnEmoji =
        selection?.anchorNode?.parentElement?.className === 'emoji';

      const selectionRange = selection?.getRangeAt(0);

      if (emojiHasBeenPlacedNextToAnEmoji) {
        const emoji = selection.anchorNode.parentElement;

        selectionRange?.setStartAfter(emoji);
      }

      selectionRange?.insertNode(emojiElement);
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
