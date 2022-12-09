import { Icon, IconButton } from '@chakra-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { useConversationPopover } from '../../../../../contexts/ConversationPopoverContext';

export function Button() {
  const { onOpen } = useConversationPopover();

  return (
    <IconButton
      minW={0}
      w={['30px', '35px', '40px']}
      h={['30px', '35px', '40px']}
      aria-label='Informações da conversa'
      fontSize={['24px', '27px', '30px']}
      icon={<Icon as={IoEllipsisVerticalSharp} />}
      variant='ghost'
      onClick={onOpen}
    />
  );
}
