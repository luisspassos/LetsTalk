import { useConversations } from '../../../../../contexts/ConversationsContext';
import { Avatar as ChakraAvatar } from 'components/Avatar';

export function Avatar() {
  const { currentConversation } = useConversations();

  return (
    <ChakraAvatar
      // w={size}
      // h={size}
      // w='16%'
      h='5%'
      src={currentConversation.data?.photoURL}
    />
  );
}
