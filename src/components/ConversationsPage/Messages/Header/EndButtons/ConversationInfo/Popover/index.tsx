import {
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
} from '@chakra-ui/react';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { useConversationPopover } from 'contexts/ConversationPopoverContext';
import { BlockUserButton } from './BlockUser/Button';
import { CopyUsernameButton } from './CopyUsername/Button';
import { SearchInput } from './SearchInput';
import { Username } from './Username';

export const Content = forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
  const { onOpen: openConversationPopover } = useConversationPopover();

  useEffect(() => {
    function handleOpenPopoverWithKeys(event: KeyboardEvent) {
      if (event.ctrlKey && event.code.includes('F')) {
        event.preventDefault();

        openConversationPopover();
      }
    }

    window.addEventListener('keydown', handleOpenPopoverWithKeys);

    return () => {
      window.removeEventListener('keydown', handleOpenPopoverWithKeys);
    };
  }, [openConversationPopover]);

  return (
    <PopoverContent maxW='270px'>
      <PopoverCloseButton />
      <PopoverHeader>
        <Username />
      </PopoverHeader>
      <PopoverBody>
        <SearchInput ref={ref} />
        <BlockUserButton />
        <CopyUsernameButton />
      </PopoverBody>
    </PopoverContent>
  );
});

Content.displayName = 'Content';
