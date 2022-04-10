import { Button, Flex, Heading, Icon, VStack } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from './Divider';
import { SearchInput } from './SearchInput';

export function ConversationsList() {
  return (
    <Flex bg='gray.200' p='25px' pb='0' direction='column'>
      <Button
        fontSize='23px'
        fontWeight={400}
        variant='ghost'
        leftIcon={<Icon as={IoMdAdd} fontSize='35px' />}
        justifyContent='start'
        pl='3px'
      >
        Adicionar contato
      </Button>
      <Divider />
      <SearchInput />
      <Heading as='h1' fontWeight={400} fontSize='30px'>
        Conversas
      </Heading>
      <VStack
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: `transparent`,
            opacity: 0,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgba(0,0,0)`,
            opacity: 0.4,
          },
        }}
        overflowY='auto'
        pb='25px'
        mx='-25px'
      >
        <ConversationDivider />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </VStack>
    </Flex>
  );
}
