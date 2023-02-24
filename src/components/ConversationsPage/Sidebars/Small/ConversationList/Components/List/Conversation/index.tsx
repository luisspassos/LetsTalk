import { Container } from './Container';
import { Divider } from './Divider';

export type ConversationProps = {
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
  data,
  index,
  numberOfConversations,
  padding,
}: ConversationProps) {
  return (
    <>
      <Container padding={padding} name={data.name}>
        {() => <></>}
        {/* {({ containerWidth }) => (
          <Content containerWidth={containerWidth} data={data} />
        )} */}
      </Container>
      <Divider
        index={index}
        numberOfConversations={numberOfConversations}
        widthToBeRemoved={padding}
      />
    </>
  );
}
