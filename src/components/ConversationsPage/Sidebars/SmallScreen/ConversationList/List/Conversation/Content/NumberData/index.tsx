import { VStack } from '@chakra-ui/react';
import { ConversationProps } from '../..';
import { ChildrenProps } from '../../Container';
import { LastMessageTime } from './LastMessageTime';
import { NumberOfUnreadMessages } from './NumberOfUnreadMessages';

type Data = Pick<ConversationProps['data'], 'updatedAt'>;

type NumberDataProps = Data & ChildrenProps;

export function NumberData({ updatedAt, containerWidth }: NumberDataProps) {
  return (
    <VStack flexShrink={0} spacing='1%' h='100%' align='end'>
      <LastMessageTime containerWidth={containerWidth} text={updatedAt} />
      <NumberOfUnreadMessages number={2} containerWidth={containerWidth} />
    </VStack>
  );
}
