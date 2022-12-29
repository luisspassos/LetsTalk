import { ReactNode } from 'react';
import { Message } from '..';
import { Container } from './Container';
import { ChakraContentBoxProps } from './Container/ContentBox';
import { SentIn } from './SentIn';
import { Wrapper } from './Wrapper';

type MessageInfo = Omit<Message, 'id' | 'message'>;

type MessageProps = {
  children: ReactNode;
  messageIndex: number;
} & MessageInfo &
  ChakraContentBoxProps;

export function Message({
  contactMessage,
  children,
  sentIn,
  messageIndex,

  ...rest
}: MessageProps) {
  return (
    <Wrapper contactMessage={contactMessage} messageIndex={messageIndex}>
      <Container contactMessage={contactMessage} contentBoxProps={rest}>
        {children}
      </Container>
      <SentIn text={sentIn} />
    </Wrapper>
  );
}
