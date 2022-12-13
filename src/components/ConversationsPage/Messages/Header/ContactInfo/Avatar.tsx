import { useConversations } from '../../../../../contexts/ConversationsContext';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

const size = ['42px', '47px', '52px'];

export function Avatar() {
  const { currentConversation } = useConversations();

  return (
    <ChakraAvatar w={size} h={size} src={currentConversation.data?.photoURL} />
  );
}
