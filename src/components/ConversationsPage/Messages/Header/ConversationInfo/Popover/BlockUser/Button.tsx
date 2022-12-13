import { Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import { BiBlock } from 'react-icons/bi';
import { useConversations } from '../../../../../../../contexts/ConversationsContext';
import { useBlockUserModal } from '../../../../../../../contexts/Modal/BlockUserModalContext';
import { Button } from '../Button';
import { CgUnblock } from 'react-icons/cg';

export function BlockUserButton() {
  const { onOpen } = useBlockUserModal();
  const { currentConversation } = useConversations();

  const action = useMemo(
    () =>
      currentConversation.data?.isBlocked
        ? {
            icon: CgUnblock,
            text: 'Desbloquear contato',
          }
        : {
            icon: BiBlock,
            text: 'Bloquear contato',
          },
    [currentConversation.data?.isBlocked]
  );

  return (
    <Button
      mt='5px'
      colorScheme='red'
      leftIcon={<Icon as={action.icon} />}
      onClick={onOpen}
      text={action.text}
    />
  );
}
