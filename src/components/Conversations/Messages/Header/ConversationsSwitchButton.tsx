import { Icon, IconButton } from '@chakra-ui/react';
import { HiOutlineUsers, HiUsers } from 'react-icons/hi';
import { useConversationsTab } from '../../../../contexts/ConversationsTabContext';
import { Tooltip } from '../../../Tooltip';

export function ConversationsSwitchButton() {
  const { onToggle, isOpen } = useConversationsTab();

  const icon = isOpen ? HiUsers : HiOutlineUsers;

  const tooltipText = isOpen
    ? 'Esconder aba de conversas'
    : 'Abrir aba de conversas';

  return (
    <Tooltip placement='bottom' label={tooltipText} ariaLabel={tooltipText}>
      <IconButton
        variant='ghost'
        fontSize={['28px']}
        color='gray.400'
        icon={<Icon as={icon} />}
        aria-label='Botão de alterar aba de conversas'
        onClick={onToggle}
      />
    </Tooltip>
  );
}
