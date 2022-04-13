import { Icon, IconButton } from '@chakra-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

export function ConversationInfoIconButton() {
  return (
    <IconButton
      aria-label='Informações da conversa'
      fontSize='30px'
      icon={<Icon as={IoEllipsisVerticalSharp} />}
      variant='ghost'
    />
  );
}
