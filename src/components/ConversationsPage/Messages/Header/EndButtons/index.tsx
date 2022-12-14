import { Flex } from '@chakra-ui/react';
import { ConversationInfo } from './ConversationInfo';
import { Search } from './Search';

export function EndButtons() {
  return (
    <Flex gap='5px'>
      <Search />
      <ConversationInfo />
    </Flex>
  );
}
