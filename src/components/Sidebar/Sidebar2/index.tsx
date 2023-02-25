import { Box, Flex, FlexProps, HStack } from '@chakra-ui/react';
import { useMobileConversationListDividerColor } from 'hooks/Colors/useMobileConversationListDividerColor';
import { ConfigurationsButton } from '../Buttons/ConfigurationsButton';
import { ConversationsButton } from '../Buttons/ConversationsButton';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';

type SidebarProps = FlexProps;

export function Sidebar2(props: SidebarProps) {
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
      <Flex justify='space-between' align='center' w='100%' h='100%' {...props}>
        <Flex>
          <Avatar />
          <HStack spacing='32%' mt='64%'>
            <ConversationsButton />
            <ConfigurationsButton />
          </HStack>
        </Flex>
        <SignOutButton />
      </Flex>
    </Box>
  );
}
