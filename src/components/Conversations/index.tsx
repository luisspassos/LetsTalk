import { Flex } from '@chakra-ui/react';
import { Loading } from '../Loading';
import { ConversationList } from './ConversationList';
import { Messages } from './Messages';
import { AddContactModal } from './Modals/AddContactModal';
import { BlockUserModal } from './Modals/BlockUserModal';

export function Conversations() {
  return (
    <>
      <BlockUserModal />
      <AddContactModal />
      <Loading />
      <Flex flex='1' minW={0}>
        <ConversationList />
        <Messages />
      </Flex>
    </>
  );
}
