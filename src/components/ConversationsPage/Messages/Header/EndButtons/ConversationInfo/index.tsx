import { Popover, PopoverTrigger } from '@chakra-ui/react';
import { useRef } from 'react';
import { useConversationPopover } from 'contexts/ConversationPopoverContext';
import { Button } from './Button';
import { Content } from './Popover';

export function ConversationInfo() {
  const popoverInitialFocusRef = useRef(null);

  const { isOpen, onClose } = useConversationPopover();

  return (
    <Popover
      initialFocusRef={popoverInitialFocusRef}
      placement='bottom-start'
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button />
      </PopoverTrigger>

      <Content ref={popoverInitialFocusRef} />
    </Popover>
  );
}
