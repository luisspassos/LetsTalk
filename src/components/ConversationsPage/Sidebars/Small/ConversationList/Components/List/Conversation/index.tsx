import { Container } from './Container';
import { Content } from './Content';
import { Divider } from './Divider';

export type ConversationProps = {
  data: {
    name: string;
    photoURL: string;
    updatedAt: string;
    lastMessage: string;
  };
  index: number;
  numberOfConversations: number;
};

export function Conversation({
  data,
  index,
  numberOfConversations,
}: ConversationProps) {
  return (
    <>
      <Container name={data.name}>
        {({ containerWidth }) => (
          <Content containerWidth={containerWidth} data={data} />
        )}
      </Container>
      <Divider index={index} numberOfConversations={numberOfConversations} />
    </>
  );
}
