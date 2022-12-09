import {
  HStack,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { useConversations } from '../../../../../../contexts/ConversationsContext';
import { useConversationPopover } from '../../../../../../contexts/ConversationPopoverContext';
import { BlockUserButton } from './BlockUser/Button';
import { CopyUsernameButton } from './CopyUsername/Button';
import { SearchInput } from './SearchInput';

export const Content = forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
  const { currentConversation } = useConversations();
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

  const contact = currentConversation.data?.username.split('#');

  return (
    <PopoverContent maxW='270px'>
      <PopoverCloseButton />
      <PopoverHeader>
        <HStack>
          <Text
            whiteSpace='nowrap'
            maxW='184px'
            textOverflow='ellipsis'
            overflowX='hidden'
          >
            {contact?.[0]}
          </Text>
          <Text opacity='90%'>#{contact?.[1]}</Text>
        </HStack>
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
