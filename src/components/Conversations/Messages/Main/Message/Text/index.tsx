import { Text as ChakraText } from '@chakra-ui/react';
import { Bg } from '../..';
import { useSearchInConversation } from '../../../../../../contexts/SearchInConversationContext';
import { TextComponent } from './Component';

type TextProps = {
  text: string;
  contactMessage?: boolean;
  bg: Bg;
};

export function Text({ bg, text, contactMessage }: TextProps) {
  const { searchText } = useSearchInConversation();

  if (!searchText) {
    return (
      <TextComponent bg={bg} contactMessage={contactMessage}>
        {text}
      </TextComponent>
    );
  }

  const searchedTextRegex = new RegExp(`(${searchText})`, 'gi');
  const textParts = text.split(searchedTextRegex);

  return (
    <TextComponent bg={bg} contactMessage={contactMessage}>
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
