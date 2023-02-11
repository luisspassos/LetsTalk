import { useBreakpointValue } from '@chakra-ui/react';
import { useCallback, RefObject } from 'react';
import { useVirtual } from 'react-virtual';
import {
  ConversationType,
  useConversations,
} from '../../../../../contexts/ConversationsContext';
import { Ref } from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';
import { VirtualizedItemsListWrapper } from '../../../../Virtualizer/VirtualizedItemsListWrapper';
import { Conversation } from './Conversation';

type VirtualizerProps = {
  padding: string;
  search: string;
  parentRef: RefObject<Ref>;
};

export function Virtualizer({ search, parentRef, padding }: VirtualizerProps) {
  const { conversations } = useConversations();

  const fetchedConversations = conversations.data?.filter(({ name }) =>
    name?.includes(search.trim())
  );

  const newFetchedConversations: ConversationType[] | undefined = [];

  for (let i = 0; i < 10; i++) {
    if (fetchedConversations === undefined) break;

    newFetchedConversations.push(fetchedConversations[0]);
  }

  const fetchedConversationsLength = fetchedConversations?.length ?? 0;

  const conversationHeight = useBreakpointValue([65, 75, 85]) ?? 0;

  const conversationVirtualizer = useVirtual({
    parentRef,
    size: newFetchedConversations?.length ?? 0,
    estimateSize: useCallback(
      () => conversationHeight + 1,
      [conversationHeight]
    ),
  });

  return (
    <VirtualizedItemsListWrapper totalSize={conversationVirtualizer.totalSize}>
      {conversationVirtualizer.virtualItems.map((virtualRow) => {
        const conversation = fetchedConversations?.[virtualRow.index];

        return (
          <Conversation
            padding={padding}
            start={virtualRow.start}
            key={virtualRow.key}
            index={virtualRow.index}
            numberOfConversations={fetchedConversationsLength}
            conversationHeight={conversationHeight}
            data={{
              name: conversation?.name ?? '',
              photoURL: conversation?.photoURL ?? '',
              lastMessage: conversation?.lastMessage ?? '',
              updatedAt: conversation?.updatedAt ?? '',
            }}
            style={{
              height: `${virtualRow.size}px`,
            }}
          />
        );
      })}
    </VirtualizedItemsListWrapper>
  );
}
