import { Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';
import { BsGear } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { IconButton } from './IconButton';
import { Avatar } from './Avatar';
import { useTab } from '../../contexts/TabContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export function Sidebar() {
  const { handleChangeTab, tab } = useTab();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push('/');
  }, [signOut, router]);

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
          <IconButton
            anyFunction={() => handleChangeTab('conversations')}
            isFocused={tab === 'conversations'}
            Icon={MdMessage}
            label='Mensagens'
          />
          <IconButton
            anyFunction={() => handleChangeTab('configurations')}
            isFocused={tab === 'configurations'}
            Icon={BsGear}
            label='Configurações'
          />
        </VStack>
      </Box>
      <IconButton
        anyFunction={() => handleSignOut()}
        Icon={ImExit}
        label='Sair'
      />
    </Flex>
  );
}
