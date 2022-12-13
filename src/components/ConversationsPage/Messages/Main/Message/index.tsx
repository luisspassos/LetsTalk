import { ReactNode } from 'react';
import { Message } from '..';
import { Container } from './Container';
import { SentIn } from './SentIn';
import { Wrapper } from './Wrapper';

type MessageInfo = Omit<Message, 'id' | 'message'>;

type MessageProps = {
  children: ReactNode;
  messageIndex: number;
} & MessageInfo;

export function Message({
  contactMessage,
  children,
  sentIn,
  messageIndex,
}: MessageProps) {
  return (
    <Wrapper contactMessage={contactMessage} messageIndex={messageIndex}>
      <Container contactMessage={contactMessage}>{children}</Container>
      <SentIn text={sentIn} />
    </Wrapper>
  );
}
