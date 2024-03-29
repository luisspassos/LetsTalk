import { Flex } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext';
import { breakpoints } from 'styles/breakpoints';
import { useConversations } from '../../contexts/ConversationsContext';
import { PageTitle } from '../PageTitle';
import { Empty } from './Empty';
import { Messages } from './Messages';
import { Sidebars } from './Sidebars';

export function Conversations() {
  const {
    conversations: { numberOfConversations },
  } = useConversations();

  const existConversations = numberOfConversations > 0;

  const { user } = useAuth();

  return (
    <>
      <PageTitle pageName='Conversas' />
      <Flex
        minW={0}
        maxW={breakpoints.last.value}
        mx='auto'
        data-testid={`chat page ${user?.displayName}`}
      >
        <Sidebars />
        {existConversations ? <Messages /> : <Empty />}
      </Flex>
    </>
  );
}
