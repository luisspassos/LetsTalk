import { Button, Flex, Heading, Icon, VStack } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { useAddContactModal } from '../../contexts/Modal/AddContactModalContext';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from './Divider';
import { SearchInput } from './SearchInput';

export function ConversationList() {
  const arr = [1, 2, 3, 4, 5, 6, 7];

  const { onOpen } = useAddContactModal();

  return (
    <>
      <Flex
        w={['265px', '295px', '335px']}
        bg='gray.200'
        p={['19px', '22px', '25px']}
        pb='0'
        direction='column'
      >
        <Button
          fontSize={['17px', '20px', '23px']}
          fontWeight={400}
          color='gray.900'
          variant='link'
          leftIcon={<Icon as={IoMdAdd} fontSize={['27px', '32px', '35px']} />}
          justifyContent='start'
          onClick={onOpen}
        >
          Adicionar contato
        </Button>
        <Divider />
        <SearchInput />
        <Heading
          as='h1'
          fontWeight={400}
          fontSize={['24px', '27px', '30px']}
          mb='13px'
        >
          Conversas
        </Heading>

        <VStack overflowY='auto' pb='10px' mx='-25px' spacing={0}>
          <ConversationDivider position='sticky' top={0} left={0} mt={0} />
          {arr.map((el, i) => (
            <Conversation key={el} arr={arr} index={i} />
          ))}
        </VStack>
      </Flex>
    </>
  );
}
