import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BlockUserButton } from './BlockUser/Button';

export const ConversationInfoPopover = forwardRef((_, ref) => {
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
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input
            ref={ref}
            variant='flushed'
            placeholder='Pesquisar na conversa'
          />
        </InputGroup>
        <BlockUserButton />
      </PopoverBody>
    </PopoverContent>
  );
});

ConversationInfoPopover.displayName = 'ConversationInfoPopover';
