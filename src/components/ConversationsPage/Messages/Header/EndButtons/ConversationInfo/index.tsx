import { Box, Popover, PopoverTrigger } from '@chakra-ui/react';
import { useRef } from 'react';
import { useConversationPopover } from '../../../../../contexts/ConversationPopoverContext';
import { Button } from './Button';
import { Tooltip } from './Button/Tooltip';
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
      <Tooltip>
        <PopoverTrigger>
          <Box display='inline-block'>
            <Button />
          </Box>
        </PopoverTrigger>
      </Tooltip>

      <Content ref={popoverInitialFocusRef} />
    </Popover>
  );
}
