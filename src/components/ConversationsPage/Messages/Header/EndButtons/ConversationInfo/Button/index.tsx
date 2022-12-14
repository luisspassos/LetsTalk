import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { useConversationPopover } from 'contexts/ConversationPopoverContext';
import { Button as ButtonComponent } from '../../Button';

export function Button() {
  const { onOpen } = useConversationPopover();

  return (
    <ButtonComponent
      icon={<IoEllipsisVerticalSharp />}
      onClick={onOpen}
      aria-label='Informações da conversa'
    />
  );
}
