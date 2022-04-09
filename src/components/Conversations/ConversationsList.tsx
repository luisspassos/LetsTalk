import { Box, Button, Divider, Heading, Icon, VStack } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { Conversation } from './Conversation';
import { SearchInput } from './SearchInput';

export function ConversationsList() {
  return (
    <Box bg='gray.200'>
      <Button leftIcon={<Icon as={IoMdAdd} />}>Adicionar contato</Button>
      <Divider />
      <SearchInput />
      <Heading as='h1'>Conversas</Heading>
      <VStack>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </VStack>
    </Box>
  );
}
