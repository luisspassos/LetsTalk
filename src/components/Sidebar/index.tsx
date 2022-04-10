import { Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage, MdOutlineMessage } from 'react-icons/md';
import { BsGear, BsGearFill } from 'react-icons/bs';
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

  const isConversations = tab === 'conversations';
  const isConfigurations = tab === 'configurations';

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
            isFocused={isConversations}
            Icon={isConversations ? MdMessage : MdOutlineMessage}
            label='Mensagens'
          />
          <IconButton
            anyFunction={() => handleChangeTab('configurations')}
            isFocused={isConfigurations}
            Icon={isConfigurations ? BsGearFill : BsGear}
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
