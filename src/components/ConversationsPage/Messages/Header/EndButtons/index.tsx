import { Flex } from '@chakra-ui/react';
import { ConversationInfo } from './ConversationInfo';
import { Search } from './Search';

export function EndButtons() {
  return (
    <Flex>
      <Search />
      <ConversationInfo />
    </Flex>
  );
}
