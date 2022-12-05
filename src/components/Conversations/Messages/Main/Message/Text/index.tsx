import { Text as ChakraText } from '@chakra-ui/react';
import { useSearchInConversation } from '../../../../../../contexts/SearchInConversationContext';
import { TextComponent } from './Component';

type TextProps = {
  text: string;
  contactMessage?: boolean;
};

export function Text({ text, contactMessage }: TextProps) {
  const { searchText } = useSearchInConversation();

  if (!searchText) {
    return (
      <TextComponent contactMessage={contactMessage}>{text}</TextComponent>
    );
  }

  const searchedTextRegex = new RegExp(`(${searchText})`, 'gi');
  const textParts = text.split(searchedTextRegex);

  return (
    <TextComponent contactMessage={contactMessage}>
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
