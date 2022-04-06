import { Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';
import { BsGear } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { IconButton } from './IconButton';
import { Avatar } from './Avatar';

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
        <Avatar />
        <VStack spacing='15px' mt='30px'>
          <IconButton href='/conversas' Icon={MdMessage} label='Mensagens' />
          <IconButton
            href='/configuracoes'
            Icon={BsGear}
            label='Configurações'
          />
        </VStack>
      </Box>
      <IconButton Icon={ImExit} label='Sair' />
    </Flex>
  );
}
