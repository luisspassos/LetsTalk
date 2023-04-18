import { HStack, Text } from '@chakra-ui/react';
import { getNameAndId } from 'contexts/AuthContext';
import { useConversations } from 'contexts/ConversationsContext';

export function Username() {
  const { currentConversation } = useConversations();

  if (currentConversation.data?.username === undefined) return null;

  const { name, id } = getNameAndId(currentConversation.data.username);

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
