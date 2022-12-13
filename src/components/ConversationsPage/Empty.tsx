import { Flex, Img } from '@chakra-ui/react';
import { ConversationsTabToggleButton } from './Messages/Header/ConversationsTabToggleButton';

export function Empty() {
  return (
    <Flex flex='1' p='20px'>
      <ConversationsTabToggleButton />
      <Img
        mx='auto'
        alignSelf='center'
        maxH={['150px', '200px', '250px']}
        flexShrink={0}
        src='/images/messages.svg'
        alt='Vázio'
        draggable={false}
      />
    </Flex>
  );
}
