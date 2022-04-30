import { Flex } from '@chakra-ui/react';
import { PageTitle } from '../PageTitle';
import { Avatar } from './Avatar';
import { Box } from './Box';

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex>
        <Box title='Configurações de perfil'>
          <Avatar />
          <Divider />
        </Box>
        <Box title='Configurações de conta'></Box>
      </Flex>
    </>
  );
}
