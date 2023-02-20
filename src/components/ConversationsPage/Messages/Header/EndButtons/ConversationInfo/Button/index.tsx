import { useConversationPopover } from 'contexts/ConversationPopoverContext';
import { forwardRef } from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { IconButton } from '../../../IconButton';

export const Button = forwardRef<HTMLButtonElement>((_, ref) => {
  const { onOpen } = useConversationPopover();

  return (
    <IconButton
      ref={ref}
      icon={<IoEllipsisVerticalSharp />}
      onClick={onOpen}
      aria-label='Informações da conversa'
    />
  );
});

Button.displayName = 'Button';
