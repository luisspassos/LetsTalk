import { Box, Flex, VStack } from '@chakra-ui/react';
import { MdMessage, MdOutlineMessage } from 'react-icons/md';
import { BsGear, BsGearFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { IconButton } from './IconButton';
import { Avatar } from './Avatar';
import { useTab } from '../../contexts/TabContext';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const { handleChangeTab, tab } = useTab();
  const { signOut } = useAuth();

  const isConversations = tab === 'conversations';
  const isConfigurations = tab === 'configurations';

  return (
    <Flex
      bg='gray.500'
      direction='column'
      justify='space-between'
      align='center'
      px={['11px', '13px', '15px']}
      py={['16px', '18px', '20px']}
    >
      <Box>
        <Avatar />
        <VStack
          spacing={['11px', '13px', '15px']}
          mt={['22px', '26px', '30px']}
        >
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
      <IconButton anyFunction={() => signOut()} Icon={ImExit} label='Sair' />
    </Flex>
  );
}
