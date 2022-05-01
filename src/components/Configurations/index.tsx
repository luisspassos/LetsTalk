import { Flex } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { PageTitle } from '../PageTitle';
import { Avatar } from './Avatar';
import { Box } from './Box';
import { Button } from './Button';
import { FaPencilAlt } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { FiShare2 } from 'react-icons/fi';
import { ButtonStack } from './ButtonStack';

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex>
        <Box title='Configurações de perfil'>
          <Avatar />
          <Divider />
          <ButtonStack>
            <Button text='Editar nome de perfil' leftIcon={FaPencilAlt} />
            <Button text='Editar foto de perfil' leftIcon={RiImageEditFill} />
            <Button text='Convidar para conversar' leftIcon={FiShare2} />
          </ButtonStack>
        </Box>
        <Box title='Configurações de conta'>
          <ButtonStack>
            <Button text='Trocar email' leftIcon={FaPencilAlt} />
            <Button text='Trocar senha' leftIcon={RiImageEditFill} />
            <Button text='Deletar conta' leftIcon={FiShare2} />
            <Button text='Sair' leftIcon={FiShare2} />
          </ButtonStack>
        </Box>
      </Flex>
    </>
  );
}
