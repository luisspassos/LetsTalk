import { Text } from '@chakra-ui/react';
import { useSearchInConversation } from '../../../../../../contexts/SearchInConversationContext';
import { MessageTextComponent } from './Component';

type MessageTextProps = {
  text: string;
  contactMessage?: boolean;
  bg: {
    default: string;
    contactMessage: string;
  };
};

export function MessageText({ bg, text, contactMessage }: MessageTextProps) {
  const { searchText } = useSearchInConversation();

  if (!searchText) {
    return (
      <MessageTextComponent bg={bg} contactMessage={contactMessage}>
        {text}
      </MessageTextComponent>
    );
  }

  const searchedTextRegex = new RegExp(`(${searchText})`, 'gi');
  const textParts = text.split(searchedTextRegex);

  return (
    <MessageTextComponent bg={bg} contactMessage={contactMessage}>
      {textParts.filter(String).map((part) => {
        return searchedTextRegex.test(part) ? (
          <Text as='mark'>{part}</Text>
        ) : (
          <Text as='span'>{part}</Text>
        );
      })}
    </MessageTextComponent>
  );
}
