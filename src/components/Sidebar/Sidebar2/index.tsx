import { Box, Flex } from '@chakra-ui/react';
import { useMobileConversationListDividerColor } from 'hooks/Colors/useMobileConversationListDividerColor';
import { ConfigurationsButton } from './Buttons/ConfigurationsButton';
import { ConversationsButton } from './Buttons/ConversationsButton';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';

export function Sidebar2() {
  const { color: borderColor } = useMobileConversationListDividerColor();

  return (
    <Box
      w='100%'
      h='4.5em'
      flexShrink={0}
      borderBottom='1px solid'
      borderBottomColor={borderColor}
      as='nav'
    >
      <Flex justify='space-between' align='center' w='100%' h='100%'>
        <Flex h='100%' align='center' w='100%'>
          <Avatar />
          <Flex flex='1' h='100%' align='center' ml='1.2em' gap='.3em'>
            <ConversationsButton />
            <ConfigurationsButton />
          </Flex>
        </Flex>
        <SignOutButton />
      </Flex>
    </Box>
  );
}
