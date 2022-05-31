import {
  Box,
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

  // const fetchedConversations = conversations.data.filter(({ name }) =>
  //   name.includes(conversationSearch.trim())
  // );

  const measure = useBreakpointValue([65, 75, 85]) ?? 0;

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: 50,
    parentRef,
    estimateSize: useCallback(() => measure + 1, [measure]),
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
      <Box
        overflowY='auto'
        ref={parentRef}
        pb={['6px', '8px', '10px']}
        mx={['-19px', '-22px', '-25px']}
      >
        <Box h={`${rowVirtualizer.totalSize}px`} w='100%' position='relative'>
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <Conversation
              key={virtualRow.index}
              index={virtualRow.index}
              numberOfConversations={50}
              data={{
                name: 'Luís',
                photoURL: 'https://github.com/luisspassos.png',
                lastMessage: '',
                updatedAt: '19:47',
              }}
              pos='absolute'
              top={0}
              left={0}
              w='100%'
              h={`${virtualRow.size}px`}
              transform={`translateY(${virtualRow.start}px)`}
            />
          ))}
          {/* {fetchedConversations.map(
            ({ uid, name, photoURL, updatedAt, lastMessage }, i) => (
              <Conversation
                key={uid}
                index={i}
                numberOfConversations={numberOfConversations}
                data={{
                  name,
                  photoURL,
                  updatedAt,
                  lastMessage,
                }}
              />
            )
          )} */}
        </Box>
      </Box>
    </Flex>
  );
}
