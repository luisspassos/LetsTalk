import { Flex, VStack } from '@chakra-ui/react';
import { Avatar } from './Content/Avatar';
import { Name } from './Content/Name';
import { LastMessage } from './Content/LastMessage';
import { LastMessageTime } from './Content/LastMessageTime';
import { NumberOfUnreadMessages } from './Content/NumberOfUnreadMessages';
import { ConversationDivider } from './Content/ConversationDivider';
import { Container } from './Container';

type ConversationProps = {
  data: {
    name: string;
    photoURL: string;
    updatedAt: string;
    lastMessage: string;
  };
  index: number;
  padding: string;
  numberOfConversations: number;
};

export function Conversation({
  data: { name, photoURL, updatedAt, lastMessage },
  index,
  numberOfConversations,
  padding,
}: ConversationProps) {
  const lastItem = index === numberOfConversations - 1;

  return (
    <>
      <Container padding={padding} name={name}>
        <Avatar photoURL={photoURL} />
        <Flex justify='space-between' flex='1'>
          <VStack
            spacing={['-1px', '-0.5px', 0]}
            alignItems='start'
            justify='center'
            w='100%'
          >
            <Name text={name} />
            <LastMessage text={lastMessage} />
          </VStack>
          <VStack
            flexShrink={0}
            spacing={['1px', '1.5px', '2px']}
            h='100%'
            align='end'
          >
            <LastMessageTime text={updatedAt} />
            <NumberOfUnreadMessages number={2} />
          </VStack>
        </Flex>
      </Container>
      {!lastItem && <ConversationDivider mt={0} widthToBeRemoved={padding} />}
    </>
  );
}
