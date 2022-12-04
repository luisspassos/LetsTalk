import { ReactNode } from 'react';
import { Bg, Message } from '..';
import { SentIn } from './SentIn';
import { Triangle } from './Triangle';
import { Wrapper } from './Wrapper';

type MessageInfo = Omit<Message, 'id' | 'message'>;

type MessageProps = {
  messageIndex: number;
  children: ReactNode;
  bg: Bg;
} & MessageInfo;

export function Message({
  children,
  contactMessage,
  messageIndex,
  sentIn,
  bg,
}: MessageProps) {
  return (
    <Wrapper contactMessage={contactMessage} messageIndex={messageIndex}>
      <Triangle contactMessage={contactMessage} bg={bg}>
        {children}
      </Triangle>
      <SentIn text={sentIn} />
    </Wrapper>
  );
}
