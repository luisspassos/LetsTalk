import { Avatar, Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';
import { BsGear } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { IconButton } from './IconButton';
import { Tooltip } from '../Tooltip';

export function Sidebar() {
  function handleCopyUsername(username: string) {
    navigator.clipboard.writeText(username);
  }

  return (
    <Flex
      bg='gray.500'
      direction='column'
      justify='space-between'
      align='center'
      px='15px'
      py='20px'
    >
      <Box>
        <Tooltip label='Copiar nome de usuário'>
          <Avatar
            cursor='pointer'
            name='Luís Passos'
            src='https://github.com/luisspassos.png'
            onClick={() => handleCopyUsername('Luis#1234')}
          />
        </Tooltip>
        <VStack spacing='15px' mt='30px'>
          <IconButton Icon={MdMessage} label='Mensagens' />
          <IconButton Icon={BsGear} label='Configurações' />
        </VStack>
      </Box>
      <IconButton Icon={ImExit} label='Sair' />
    </Flex>
  );
}
