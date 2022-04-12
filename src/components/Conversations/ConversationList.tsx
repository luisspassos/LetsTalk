import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from './Divider';
import { SearchInput } from './SearchInput';

export function ConversationList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const arr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Flex w='335px' bg='gray.200' p='25px' pb='0' direction='column'>
        <Button
          fontSize='23px'
          fontWeight={400}
          color='gray.900'
          variant='link'
          leftIcon={<Icon as={IoMdAdd} fontSize='35px' />}
          justifyContent='start'
          pl='3px'
          onClick={onOpen}
        >
          Adicionar contato
        </Button>
        <Divider />
        <SearchInput />
        <Heading as='h1' fontWeight={400} fontSize='30px' mb='13px'>
          Conversas
        </Heading>

        <VStack overflowY='auto' pb='10px' mx='-25px' spacing={0}>
          <ConversationDivider position='sticky' top={0} left={0} mt={0} />
          {arr.map((el, i) => (
            <Conversation key={el} arr={arr} index={i} />
          ))}
        </VStack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Usuário</FormLabel>
              <Input placeholder='Insira um usuário, exemplo: usuário#2348' />
              <FormHelperText>
                O nome de usuário com ID pode ser encontrado nas configurações
                ou clicando na sua foto no barra ao lado.
              </FormHelperText>
              <Button>Cancelar</Button>
              <Button>Adicionar</Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
