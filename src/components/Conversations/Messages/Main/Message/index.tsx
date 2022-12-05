import { ReactNode } from 'react';
import { Message } from '..';
import { Container } from './Container';
import { SentIn } from './SentIn';
import { Wrapper } from './Wrapper';

type MessageInfo = Omit<Message, 'id' | 'message'>;

type MessageProps = {
  messageIndex: number;
  children: ReactNode;
} & MessageInfo;

export function Message({
  children,
  contactMessage,
  messageIndex,
  sentIn,
}: MessageProps) {
  return (
    <Wrapper contactMessage={contactMessage} messageIndex={messageIndex}>
      <Container contactMessage={contactMessage}>{children}</Container>
      <SentIn text={sentIn} />
    </Wrapper>
  );
}
