import {
  HStack,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { BlockUserButton } from './BlockUser/Button';
import { SearchInput } from './SearchInput';

export const ConversationInfoPopover = forwardRef(
  (_, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <PopoverContent maxW='270px'>
        <PopoverCloseButton />
        <PopoverHeader>
          <HStack>
            <Text>Guilherme</Text>
            <Text opacity='90%'>#2837</Text>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <SearchInput ref={ref} />
          <BlockUserButton />
        </PopoverBody>
      </PopoverContent>
    );
  }
);

ConversationInfoPopover.displayName = 'ConversationInfoPopover';
