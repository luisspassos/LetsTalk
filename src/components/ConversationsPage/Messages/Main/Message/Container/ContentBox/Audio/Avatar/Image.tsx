import { Avatar } from 'components/Avatar';
import { Message } from 'components/ConversationsPage/Messages/Main';
import { useAuth } from 'contexts/AuthContext';
import { useConversations } from 'contexts/ConversationsContext';

type Image = {
  isContact: Message['contactMessage'];
};

export function Image({ isContact }: Image) {
  const { user } = useAuth();
  const {
    currentConversation: { data: currentConversation },
  } = useConversations();

  const src = isContact ? currentConversation?.photoURL : user?.photoURL;

  return <Avatar src={src} />;
}
