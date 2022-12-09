import { Box, Popover, PopoverTrigger } from '@chakra-ui/react';
import { useRef } from 'react';
import { useConversationPopover } from '../../../../../contexts/ConversationPopoverContext';
import { Tooltip } from '../../../../Tooltip';
import { Button } from './Button';
import { Content } from './Popover';

export function ConversationInfoButton() {
  const popoverInitialFocusRef = useRef(null);

  const { isOpen, onClose } = useConversationPopover();

  return (
    <Popover
      initialFocusRef={popoverInitialFocusRef}
      placement='bottom-start'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tooltip
        ariaLabel='Informações da conversa'
        label='Informações da conversa'
        placement='bottom-start'
      >
        <Box display='inline-block'>
          <PopoverTrigger>
            <Box display='inline-block'>
              <Button />
            </Box>
          </PopoverTrigger>
        </Box>
      </Tooltip>

      <Content ref={popoverInitialFocusRef} />
    </Popover>
  );
}
