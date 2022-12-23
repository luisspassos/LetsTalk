import { Text as ChakraText } from '@chakra-ui/react';
import { useSearchInConversation } from '../../../../../../../../contexts/SearchInConversationContext';
import { TextComponent } from './Component';
import getEmojiRegex from 'emoji-regex';

type TextProps = {
  children: string;
};

export function Text({ children: text }: TextProps) {
  const emojiRegex = getEmojiRegex();

  const emojis = text.match(emojiRegex);

  const textWithoutEmoji = text.replaceAll(emojiRegex, '');

  const isOneEmoji = emojis?.length === 1 && textWithoutEmoji === '';

  const { searchText } = useSearchInConversation();

  if (!searchText) {
    return <TextComponent isOneEmoji={isOneEmoji}>{text}</TextComponent>;
  }

  const searchedTextRegex = new RegExp(`(${searchText})`, 'gi');
  const textParts = text.split(searchedTextRegex);

  return (
    <TextComponent isOneEmoji={isOneEmoji}>
      {textParts.filter(String).map((part) => {
        return searchedTextRegex.test(part) ? (
          <ChakraText as='mark'>{part}</ChakraText>
        ) : (
          <ChakraText as='span'>{part}</ChakraText>
        );
      })}
    </TextComponent>
  );
}
