import { useBreakpointValue } from '@chakra-ui/react';
import { useCallback, RefObject } from 'react';
import { useVirtual } from 'react-virtual';
import { useConversations } from '../../../../../contexts/ConversationsContext';
import { Ref } from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';
import { VirtualizedItemsListWrapper } from '../../../../Virtualizer/VirtualizedItemsListWrapper';
import { Conversation } from './Conversation';

type VirtualizerProps = {
  search: string;
  parentRef: RefObject<Ref>;
};

export function Virtualizer({ search, parentRef }: VirtualizerProps) {
  const { conversations } = useConversations();

  const fetchedConversations = conversations.data?.filter(({ name }) =>
    name?.includes(search.trim())
  );

  const fetchedConversationsLength = fetchedConversations?.length ?? 0;

  const conversationHeight = useBreakpointValue([65, 75, 85]) ?? 0;

  const conversationVirtualizer = useVirtual({
    parentRef,
    size: fetchedConversations?.length ?? 0,
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
