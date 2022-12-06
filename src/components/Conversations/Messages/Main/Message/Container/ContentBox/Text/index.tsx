import { Text as ChakraText } from '@chakra-ui/react';
import { useSearchInConversation } from '../../../../../../../../contexts/SearchInConversationContext';
import { TextComponent } from './Component';

type TextProps = {
  children: string;
};

export function Text({ children: text }: TextProps) {
  const { searchText } = useSearchInConversation();

  if (!searchText) {
    return <TextComponent>{text}</TextComponent>;
  }

  const searchedTextRegex = new RegExp(`(${searchText})`, 'gi');
  const textParts = text.split(searchedTextRegex);

  return (
    <TextComponent>
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
