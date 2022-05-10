import { Flex, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { useConversationsTab } from '../../../contexts/ConversationsTabContext';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { AddContactButton } from './AddContactButton';
import { SearchInput } from './SearchInput';
import { useCallback, useState } from 'react';
import { Divider } from '../Divider';
import { useConversations } from '../../../contexts/ConversationsContext';

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

  const numberOfConversations = fetchedConversations.length;

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
      <VStack
        overflowY='auto'
        pb={['6px', '8px', '10px']}
        mx={['-19px', '-22px', '-25px']}
        spacing={0}
      >
        <ConversationDivider position='sticky' top={0} left={0} mt={0} />
        {fetchedConversations.map(({ uid, name, photoURL }, i) => (
          <Conversation
            key={uid}
            index={i}
            numberOfConversations={numberOfConversations}
            data={{
              name,
              photoURL,
            }}
          />
        ))}
      </VStack>
    </Flex>
  );
}
