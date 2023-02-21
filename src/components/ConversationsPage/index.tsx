import { Flex } from '@chakra-ui/react';
import { breakpoints } from 'styles/breakpoints';
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
      <Flex minW={0} maxW={breakpoints.last.value} mx='auto'>
        <Flex w='40%'>
          {/* <Sidebar /> */}
          <ConversationList />
        </Flex>
        {existConversations ? <Messages /> : <Empty />}
      </Flex>
    </>
  );
}
