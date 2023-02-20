import { useConversations } from '../../../../../../contexts/ConversationsContext';
import { Avatar as ChakraAvatar } from 'components/Avatar';

export function Avatar() {
  const { currentConversation } = useConversations();

  return <ChakraAvatar h='62%' src={currentConversation.data?.photoURL} />;
}
