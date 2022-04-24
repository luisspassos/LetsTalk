import { Flex } from '@chakra-ui/react';
import { useConversations } from '../../contexts/ConversationsContext';
import { ConversationList } from './ConversationList';
import { Empty } from './Empty';
import { Messages } from './Messages';
import { AddContactModal } from './Modals/AddContactModal';
import { BlockUserModal } from './Modals/BlockUserModal';

export function Conversations() {
  const {
    conversations: { numberOfConversations },
  } = useConversations();

  const existConversations = numberOfConversations > 0;

  return (
    <>
      <BlockUserModal />
      <AddContactModal />
      <Flex flex='1' minW={0}>
        <ConversationList />
        {existConversations ? <Messages /> : <Empty />}
      </Flex>
    </>
  );
}
