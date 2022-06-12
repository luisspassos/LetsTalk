import {
  Flex,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConversationsTab } from '../../../contexts/ConversationsTabContext';
import { AddContactButton } from './AddContactButton';
import { SearchInput } from './SearchInput';
import React, { useCallback, useRef, useState } from 'react';
import { Divider } from '../Divider';
import { useConversations } from '../../../contexts/ConversationsContext';
import { useVirtual } from 'react-virtual';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { VirtualizedItemsListWrapper } from '../../Virtual/VirtualizedItemsListWrapper';
import { ScrollableBoxOfVirtualizedItems } from '../../Virtual/ScrollableBoxOfVirtualizedItems';

export function ConversationListComponent() {
  const { isOpen } = useConversationsTab();
  const { conversations } = useConversations();

  const [conversationSearch, setConversationSearch] = useState('');

  const changeConversationSearchState = useCallback(
    (conversationSearch: string) => {
      setConversationSearch(conversationSearch);
    },
    []
  );

  const fetchedConversations = conversations.data.filter(({ name }) =>
    name.includes(conversationSearch.trim())
  );

  const conversationHeight = useBreakpointValue([65, 75, 85]) ?? 0;

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const conversationVirtualizer = useVirtual({
    size: fetchedConversations.length,
    parentRef: scrollBoxRef,
    estimateSize: useCallback(
      () => conversationHeight + 1,
      [conversationHeight]
    ),
  });

  return (
    <Flex
      display={isOpen ? 'flex' : 'none'}
      w={['265px', '295px', '335px']}
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      p={['19px 19px 0', '22px 22px 0', '25px 25px 0']}
      direction='column'
      borderRight={useColorModeValue(undefined, '1px solid')}
      borderRightColor={useColorModeValue(undefined, 'whiteAlpha.500')}
      as='aside'
    >
      <AddContactButton />
      <Divider />
      <SearchInput
        changeConversationSearchState={changeConversationSearchState}
      />
      <Heading
        as='h1'
        fontWeight={400}
        fontSize={['22px', '26px', '30px']}
        mb={['7px', '10px', '13px']}
      >
        Conversas
      </Heading>
      <ScrollableBoxOfVirtualizedItems
        ref={scrollBoxRef}
        pb={['6px', '8px', '10px']}
        mx={['-19px', '-22px', '-25px']}
      >
        <ConversationDivider
          position='sticky'
          top={0}
          left={0}
          mt={0}
          mx='auto'
        />
        <VirtualizedItemsListWrapper
          totalSize={conversationVirtualizer.totalSize}
        >
          {conversationVirtualizer.virtualItems.map((virtualRow) => {
            const conversation = fetchedConversations[virtualRow.index];

            return (
              <Conversation
                key={virtualRow.index}
                index={virtualRow.index}
                numberOfConversations={fetchedConversations.length}
                conversationHeight={conversationHeight}
                data={{
                  name: conversation.name,
                  photoURL: conversation.photoURL,
                  lastMessage: conversation.lastMessage,
                  updatedAt: conversation.updatedAt,
                }}
                h={`${virtualRow.size}px`}
                transform={`translateY(${virtualRow.start}px)`}
              />
            );
          })}
        </VirtualizedItemsListWrapper>
      </ScrollableBoxOfVirtualizedItems>
    </Flex>
  );
}
