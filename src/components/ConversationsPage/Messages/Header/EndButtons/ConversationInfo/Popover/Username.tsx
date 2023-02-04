import { HStack, Text } from '@chakra-ui/react';
import { useConversations } from 'contexts/ConversationsContext';

export function Username() {
  const { currentConversation } = useConversations();

  const contact = currentConversation.data?.username?.split('#');

  const name = contact?.[0];
  const id = contact?.[1];

  return (
    <HStack>
      <Text
        whiteSpace='nowrap'
        maxW='184px'
        textOverflow='ellipsis'
        overflowX='hidden'
      >
        {name}
      </Text>
      <Text opacity='90%'>#{id}</Text>
    </HStack>
  );
}
