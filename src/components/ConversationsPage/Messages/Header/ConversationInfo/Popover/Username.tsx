import { HStack, Text } from '@chakra-ui/react';
import { useConversations } from 'contexts/ConversationsContext';

export function Username() {
  const { currentConversation } = useConversations();

  const contact = currentConversation.data?.username.split('#');

  return (
    <HStack>
      <Text
        whiteSpace='nowrap'
        maxW='184px'
        textOverflow='ellipsis'
        overflowX='hidden'
      >
        {contact?.[0]}
      </Text>
      <Text opacity='90%'>#{contact?.[1]}</Text>
    </HStack>
  );
}
