import { Avatar, Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';
import { BsGear } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { IconButton } from './IconButton';
import { Tooltip } from '../Tooltip';

export function Sidebar() {
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
        <Tooltip label='Luis#1234' ariaLabel='Copiar nome de usuário'>
          <Avatar
            cursor='pointer'
            name='Luís Passos'
            src='https://github.com/luisspassos.png'
          />
        </Tooltip>
        <VStack spacing='15px' mt='30px'>
          <IconButton Icon={MdMessage} ariaLabel='Mensagens' />
          <IconButton Icon={BsGear} ariaLabel='Configurações' />
        </VStack>
      </Box>
      <IconButton Icon={ImExit} ariaLabel='Sair' />
    </Flex>
  );
}
