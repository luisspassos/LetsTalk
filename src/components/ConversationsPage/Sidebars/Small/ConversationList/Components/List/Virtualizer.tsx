import {
  ConversationType,
  useConversations,
} from 'contexts/ConversationsContext';
import { Conversation } from './Conversation';

type VirtualizerProps = {
  search: string;
};

export function Virtualizer({ search }: VirtualizerProps) {
  const { conversations } = useConversations();

  const fetchedConversations = conversations.data?.filter(({ name }) =>
    name?.includes(search.trim())
  );

  const newFetchedConversations: ConversationType[] = [];

  for (let i = 0; i < 10; i++) {
    if (fetchedConversations === undefined) break;

    const fetchedConversation: ConversationType = {
      ...fetchedConversations[0],
      uid: i + '',
    };

    newFetchedConversations.push(fetchedConversation);
  }

  const fetchedConversationsLength = newFetchedConversations.length;

  return (
    <>
      {newFetchedConversations.map(
        ({ lastMessage, name, photoURL, updatedAt, uid }, i) => (
          <Conversation
            key={uid}
            index={i}
            numberOfConversations={fetchedConversationsLength}
            data={{
              name: name ?? '',
              photoURL: photoURL ?? '',
              lastMessage: lastMessage ?? '',
              updatedAt: updatedAt ?? '',
            }}
          />
        )
      )}
    </>
  );
}
