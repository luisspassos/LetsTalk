import { VStack } from '@chakra-ui/react';
import { ConversationProps } from '../..';
import { ChildrenProps } from '../../Container';
import { LastMessage } from './LastMessage';
import { Name } from './Name';

type Data = Pick<ConversationProps['data'], 'name' | 'lastMessage'>;

type NameAndLastMessageProps = Data & ChildrenProps;

export function NameAndLastMessage({
  containerWidth,
  lastMessage,
  name,
}: NameAndLastMessageProps) {
  return (
    <VStack spacing={0} alignItems='start' justify='center' minW='0' w='100%'>
      <Name containerWidth={containerWidth} text={name} />
      <LastMessage containerWidth={containerWidth} text={lastMessage} />
    </VStack>
  );
}
