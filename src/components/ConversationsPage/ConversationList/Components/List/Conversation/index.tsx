import { Avatar } from './Content/Avatar';
import { ConversationDivider } from './Content/ConversationDivider';
import { Container } from './Container';
import { Name } from './Content/Name';

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
        <div>
          <Name text={name} />
        </div>
        {/* <Flex w='100%' justifyContent='space-between'> */}
        {/* <VStack
            spacing={['-1px', '-0.5px', 0]}
            alignItems='start'
            justify='center'
            w='100%'
          >
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
          </VStack> */}
        {/* </Flex> */}
      </Container>
      {!lastItem && <ConversationDivider mt={0} widthToBeRemoved={padding} />}
    </>
  );
}
