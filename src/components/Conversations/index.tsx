import { Flex } from '@chakra-ui/react';
import { ConversationList } from './ConversationList';
import { Messages } from './Messages';

export function Conversations() {
  return (
    <Flex flex='1'>
      <ConversationList />
      <Messages />
    </Flex>
  );
}
