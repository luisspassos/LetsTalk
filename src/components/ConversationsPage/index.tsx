import { Flex } from '@chakra-ui/react';
import { useConversations } from '../../contexts/ConversationsContext';
import { PageTitle } from '../PageTitle';
import { ConversationList } from './ConversationList';
import { Empty } from './Empty';
import { Messages } from './Messages';
import { AddContactModal } from './Modals/AddContactModal';
import { ToggleBlockUserModal } from './Modals/ToggleBlockUserModal';

export function Conversations() {
  const {
    conversations: { numberOfConversations },
  } = useConversations();

  const existConversations = numberOfConversations > 0;

  return (
    <>
      <PageTitle pageName='Conversas' />
      <ToggleBlockUserModal />
      <AddContactModal />
      <Flex flex='1' minW={0}>
        <ConversationList />
        {existConversations ? <Messages /> : <Empty />}
      </Flex>
    </>
  );
}
