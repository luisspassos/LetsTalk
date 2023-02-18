import { Flex } from '@chakra-ui/react';
import { ConversationProps } from '..';
import { ChildrenProps } from '../Container';
import { Avatar } from './Avatar';
import { NameAndLastMessage } from './NameAndLastMessage';
import { NumberData } from './NumberData';

type ContentProps = {
  data: ConversationProps['data'];
} & ChildrenProps;

export function Content({
  data: { name, photoURL, updatedAt, lastMessage },
  containerWidth,
}: ContentProps) {
  return (
    <>
      <Avatar photoURL={photoURL} />
      <Flex minW='0' w='100%' justifyContent='space-between'>
        <NameAndLastMessage
          containerWidth={containerWidth}
          lastMessage={lastMessage}
          name={name}
        />
        <NumberData containerWidth={containerWidth} updatedAt={updatedAt} />
      </Flex>
    </>
  );
}
