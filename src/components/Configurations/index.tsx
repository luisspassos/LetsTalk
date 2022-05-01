import { Flex } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { PageTitle } from '../PageTitle';
import { Avatar } from './Avatar';
import { Box } from './Box';
import { Button } from './Button';
import { FaPencilAlt } from 'react-icons/fa';
import {
  RiDeleteBin2Line,
  RiFileCopy2Line,
  RiImageEditFill,
  RiLockPasswordLine,
} from 'react-icons/ri';
import { FiShare2 } from 'react-icons/fi';
import { ButtonStack } from './ButtonStack';
import { HiOutlineMail } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';
import { ThemeSelect } from './ThemeSelect';

export function Configurations() {
  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex flex='1' align='center' justify='center' gap='80px'>
        <Box title='Configurações de perfil'>
          <Avatar />
          <Divider />
          <ButtonStack>
            <Button text='Copiar nome de perfil' leftIcon={RiFileCopy2Line} />
            <Button text='Editar nome de perfil' leftIcon={FaPencilAlt} />
            <Button text='Editar foto de perfil' leftIcon={RiImageEditFill} />
            <Button text='Convidar para conversar' leftIcon={FiShare2} />
          </ButtonStack>
        </Box>
        <Box title='Configurações de conta'>
          <ThemeSelect />
          <ButtonStack>
            <Button text='Trocar email' leftIcon={HiOutlineMail} />
            <Button text='Trocar senha' leftIcon={RiLockPasswordLine} />
            <Button text='Deletar conta' leftIcon={RiDeleteBin2Line} />
            <Button text='Sair' leftIcon={ImExit} />
          </ButtonStack>
        </Box>
      </Flex>
    </>
  );
}
