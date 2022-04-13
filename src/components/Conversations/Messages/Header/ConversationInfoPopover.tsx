import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type ConversationInfoPopoverProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function ConversationInfoPopover({
  children,
  isOpen,
  onClose,
}: ConversationInfoPopoverProps) {
  return (
    <Popover closeOnBlur={false} isOpen={isOpen} onClose={onClose} isLazy>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
