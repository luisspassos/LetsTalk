import {
  HStack,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { useConversations } from '../../../../../../contexts/ConversationsContext';
import { BlockUserButton } from './BlockUser/Button';
import { CopyUsernameButton } from './CopyUsername/Button';
import { SearchInput } from './SearchInput';

export const ConversationInfoPopover = forwardRef(
  (_, ref: ForwardedRef<HTMLInputElement>) => {
    const { currentConversation } = useConversations();

    const [contactName, contactId] =
      currentConversation.data.username.split('#');

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
              {contactName}
            </Text>
            <Text opacity='90%'>#{contactId}</Text>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <SearchInput ref={ref} />
          <BlockUserButton />
          <CopyUsernameButton />
        </PopoverBody>
      </PopoverContent>
    );
  }
);

ConversationInfoPopover.displayName = 'ConversationInfoPopover';
