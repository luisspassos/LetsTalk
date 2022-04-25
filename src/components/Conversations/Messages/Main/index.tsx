import { Stack } from '@chakra-ui/react';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { Message } from './Message';

export function Main() {
  const {
    currentConversation: {
      data: { messages },
    },
  } = useConversations();

  return (
    <Stack
      overflow='auto'
      as='main'
      py={['14px', '17px', '20px']}
      pr={['14px', '17px', '20px']}
      mr={['-14px', '-17px', '-20px']}
      spacing={['6px', '8px', '10px']}
    >
      {messages?.map(({ message, id, contactMessage, createdAt }) => (
        <Message
          key={id}
          isYourMessage={!contactMessage}
          data={{ createdAt, text: message }}
        />
      ))}
    </Stack>
  );
}
