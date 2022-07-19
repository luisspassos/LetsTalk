import { Center, Image } from '@chakra-ui/react';
import { parse as twemojiParse } from 'twemoji-parser';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useMessageForm } from '../../../../../../../../contexts/MessageFormContext';
import { EmojiType } from '../../../../../../../../utils/types';

type EmojiProps = {
  emoji: string;
  name: string;
};

export function Emoji({ emoji, name }: EmojiProps) {
  const {
    categories: { setState: setCategories, data: categories },
  } = useEmoji();

  const {
    messageForm: { getValues: getFormValues, setValue: setFormValues },
    messageInputRef,
  } = useMessageForm();

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

    function addEmojiInMessage() {
      const message = getFormValues('message');

      const cursorPosition = messageInputRef.current?.selectionStart ?? 0;

      // this code takes into account the cursor position

      const messageBeforeEmoji = message.slice(0, cursorPosition);
      const messageRest = message.slice(cursorPosition);

      const newMessage = `${messageBeforeEmoji} ${emoji}${messageRest}`;

      setFormValues('message', newMessage.replace(/\s/g, ''));

      messageInputRef.current?.setSelectionRange(
        cursorPosition + 1,
        cursorPosition + 1
      );
      messageInputRef.current?.focus();
    }

    addEmojiInMessage();
    addEmojiInRecentCategory();
  }

  return (
    <Center as='li' w={['36px', '41px', '46px']} h={['36px', '41px', '46px']}>
      <Image
        cursor='pointer'
        onClick={handleSelectEmoji}
        w='70%'
        h='70%'
        src={twemoji}
        alt={emoji}
        aria-label={name}
      />
    </Center>
  );
}
