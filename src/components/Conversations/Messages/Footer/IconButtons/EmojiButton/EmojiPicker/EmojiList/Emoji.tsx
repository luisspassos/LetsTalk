import { Center } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useMessageInputRef } from '../../../../../../../../contexts/MessageInputRef';

type EmojiProps = {
  emoji: string;
  name: string;
};

export function Emoji({ emoji }: EmojiProps) {
  const { ref: messageInputRef } = useMessageInputRef();

  // const {
  //   categories: { setState: setCategories, data: categories },
  // } = useEmoji();
  // const { messageInput } = useMessageInput();
  // const { removeSelectionContent } = useRemoveSelectionContent();

  // const twemoji = twemojiParse(emoji)[0].url;

  // function handleSelectEmoji() {
  //   function addEmojiInRecentCategory() {
  //     const categoriesDataClone = [...categories.data];

  //     const newCategoriesData = categoriesDataClone.map((category) => {
  //       const returnCategoriesData = (categoryEmojis: EmojiType[]) => ({
  //         ...category,
  //         emojis: [
  //           {
  //             emoji,
  //             name,
  //           },
  //           ...categoryEmojis,
  //         ],
  //       });

  //       if (category.name !== 'Recentes') {
  //         return category;
  //       }

  //       const emojiExists = category.emojis.some(
  //         (emoji) => emoji.name === name
  //       );

  //       if (emojiExists) {
  //         const categoryEmojisFiltered = category.emojis.filter(
  //           ({ emoji: categoryEmoji }) => categoryEmoji !== emoji
  //         );

  //         return returnCategoriesData(categoryEmojisFiltered);
  //       }

  //       if (category.emojis.length === 25) {
  //         category.emojis.pop();
  //       }

  //       return returnCategoriesData(category.emojis);
  //     });

  //     const recentlyUsedEmojis = newCategoriesData[0].emojis;

  //     localStorage.setItem(
  //       'recentlyUsedEmojis',
  //       JSON.stringify(recentlyUsedEmojis)
  //     );

  //     setCategories((prevState) => ({
  //       ...prevState,
  //       data: newCategoriesData,
  //     }));
  //   }

  //   async function insertEmoji() {
  //     const messageInputIsFocused = messageInput === document.activeElement;

  //     const selection = getSelection();

  //     function putCursorAtTheEnd() {
  //       if (!messageInput) return;

  //       selection?.selectAllChildren(messageInput);
  //       selection?.collapseToEnd();
  //     }

  //     if (!messageInputIsFocused) {
  //       messageInput?.focus();

  //       putCursorAtTheEnd();
  //     }

  //     removeSelectionContent();

  //     const { getTwemojiElement } = await import(
  //       '../../../../../../../../utils/getTwemojiElement'
  //     );

  //     const twemojiElement = getTwemojiElement(emoji, twemoji);

  //     const selectionRange = selection?.getRangeAt(0);

  //     const { positionSelectionIfValueHasBeenPlacedCloseToAnEmoji } =
  //       await import(
  //         '../../../../../../../../utils/positionSelectionIfValueHasBeenPlacedCloseToAnEmoji'
  //       );

  //     positionSelectionIfValueHasBeenPlacedCloseToAnEmoji(
  //       selection,
  //       selectionRange
  //     );

  //     selectionRange?.insertNode(twemojiElement);
  //     selection?.collapseToEnd();
  //   }

  //   insertEmoji();
  //   addEmojiInRecentCategory();
  // }

  function insertEmoji() {
    const input = messageInputRef.current;

    const isFocused = document.activeElement === input;

    if (!isFocused) input?.focus();

    const [start, end] = [
      input?.selectionStart,
      input?.selectionEnd,
    ] as number[];

    input?.setRangeText(emoji, start, end, 'end');

    function handleInputSize() {
      input?.dispatchEvent(new Event('change'));
    }

    handleInputSize();
  }

  function handleDisableFocusOnClick(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <Center
      onMouseDown={handleDisableFocusOnClick}
      onClick={insertEmoji}
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
