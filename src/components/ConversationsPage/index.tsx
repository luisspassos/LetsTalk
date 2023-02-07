import { Flex } from '@chakra-ui/react';
import { useConversations } from '../../contexts/ConversationsContext';
import { PageTitle } from '../PageTitle';
import { ConversationList } from './ConversationList';
import { Empty } from './Empty';
import { Messages } from './Messages';

export function Conversations() {
  const {
    conversations: { numberOfConversations },
  } = useConversations();

  const existConversations = numberOfConversations > 0;

  return (
    <>
      <PageTitle pageName='Conversas' />
      <Flex flex='1' minW={0} maxW='1400px' mx='auto'>
        <ConversationList />
        {existConversations ? <Messages /> : <Empty />}
      </Flex>
    </>
  );
}
