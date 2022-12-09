import { IconButton, useColorModeValue, Icon } from '@chakra-ui/react';
import { HiUsers, HiOutlineUsers } from 'react-icons/hi';
import { useConversationsTab } from '../../../../../contexts/ConversationsTabContext';

export function Button() {
  const { onToggle, isOpen } = useConversationsTab();

  const icon = isOpen ? HiUsers : HiOutlineUsers;

  return (
    <IconButton
      variant='ghost'
      fontSize={['28px']}
      color={useColorModeValue('gray.400', 'gray.200')}
      icon={<Icon as={icon} />}
      aria-label='Botão de alternar aba de conversas'
      onClick={onToggle}
    />
  );
}
