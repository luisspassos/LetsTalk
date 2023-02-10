import { Flex, VStack } from '@chakra-ui/react';
import { Avatar } from './Content/Avatar';
import { Name } from './Content/Name';
import { LastMessage } from './Content/LastMessage';
import { LastMessageTime } from './Content/LastMessageTime';
import { NumberOfUnreadMessages } from './Content/NumberOfUnreadMessages';
import { ConversationDivider } from './Content/ConversationDivider';
import { HTMLProps } from '../../../../../Virtualizer';
import { Wrapper } from './Wrapper';
import { Container } from './Container';

type ConversationProps = {
  data: {
    name: string;
    photoURL: string;
    updatedAt: string;
    lastMessage: string;
  };
  conversationHeight: number;
  index: number;
  paddingToBeRemoved: string;
  numberOfConversations: number;
  start: number;
  style: HTMLProps['style'];
};

export function Conversation({
  data: { name, photoURL, updatedAt, lastMessage },
  index,
  numberOfConversations,
  conversationHeight,
  paddingToBeRemoved,
  style,
  start,
}: ConversationProps) {
  const lastItem = index === numberOfConversations - 1;

  return (
    <Wrapper style={style} start={start}>
      <Container
        paddingToBeRemoved={paddingToBeRemoved}
        conversationHeight={conversationHeight}
        name={name}
      >
        <Avatar photoURL={photoURL} />
        <Flex justify='space-between' flex='1'>
          <VStack
            spacing={['-1px', '-0.5px', 0]}
            alignItems='start'
            justify='center'
          >
            <Name text={name} />
            <LastMessage text={lastMessage} />
          </VStack>
          <VStack spacing={['1px', '1.5px', '2px']} h='100%' align='end'>
            <LastMessageTime text={updatedAt} />
            <NumberOfUnreadMessages number={2} />
          </VStack>
        </Flex>
      </Container>
      {!lastItem && <ConversationDivider mt={0} />}
    </Wrapper>
  );
}
