import {
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from './Divider';
import { SearchInput } from './SearchInput';
import { Input } from '../Form/Input';
import { ModalTitle } from '../Modal/ModalTitle';
import { ConfirmButton } from '../Modal/ConfirmButton';

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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalTitle text='Adicionar contato' />
          <ModalCloseButton />
          <ModalBody pb='20px'>
            <FormControl
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <Input
                id='username'
                label='Usuário'
                inputProps={{
                  placeholder: 'Insira um usuário, exemplo: usuario#1234',
                  h: '45px',
                  borderColor: 'blueAlpha.900',
                }}
                labelProps={{
                  color: 'gray.900',
                  opacity: 1,
                  fontSize: '16px',
                }}
                helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
                clicando na foto na barra ao lado.'
              />

              <HStack mt='12px' spacing='10px'>
                <Button colorScheme='red' variant='outline'>
                  Cancelar
                </Button>
                <ConfirmButton text='Adicionar' />
              </HStack>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
