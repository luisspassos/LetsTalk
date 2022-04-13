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
};

export function ConversationInfoPopover({
  children,
}: ConversationInfoPopoverProps) {
  return (
    <Popover closeOnBlur={false} isLazy>
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
