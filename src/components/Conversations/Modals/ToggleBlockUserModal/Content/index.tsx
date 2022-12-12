import { Flex } from '@chakra-ui/react';
import { useConversations } from 'contexts/ConversationsContext';
import { Buttons } from './Buttons';
import { Header } from './Header';

export function Content() {
  const { currentConversation } = useConversations();

  const actionText = currentConversation.data?.isBlocked
    ? 'desbloquear'
    : 'bloquear';

  return (
    <Flex direction='column' align='center' gap={['6px', '8px', '10px']}>
      <Header title={actionText} />
      <Buttons confirmButtonText={actionText} />
    </Flex>
  );
}
