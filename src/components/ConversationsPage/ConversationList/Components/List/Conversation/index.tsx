import { Avatar } from './Content/Avatar';
import { ConversationDivider } from './Content/ConversationDivider';
import { Container } from './Container';
import { Name } from './Content/Name';
import { Flex, VStack } from '@chakra-ui/react';
import { LastMessage } from './Content/LastMessage';
import { LastMessageTime } from './Content/LastMessageTime';
import { NumberOfUnreadMessages } from './Content/NumberOfUnreadMessages';

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
        {({ containerWidth }) => (
          <>
            <Avatar photoURL={photoURL} />
            <Flex minW='0' w='100%' justifyContent='space-between'>
              <VStack
                spacing={['-1px', '-0.5px', 0]}
                alignItems='start'
                justify='center'
                minW='0'
                w='100%'
              >
                <Name containerWidth={containerWidth} text={name} />
                <LastMessage
                  containerWidth={containerWidth}
                  text={lastMessage}
                />
              </VStack>
              <VStack
                flexShrink={0}
                spacing={['1px', '1.5px', '2px']}
                h='100%'
                align='end'
              >
                <LastMessageTime
                  containerWidth={containerWidth}
                  text={updatedAt}
                />
                <NumberOfUnreadMessages number={2} />
              </VStack>
            </Flex>
          </>
        )}
      </Container>
      {!lastItem && <ConversationDivider mt={0} widthToBeRemoved={padding} />}
    </>
  );
}
