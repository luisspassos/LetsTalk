import { Flex } from '@chakra-ui/react';
import { useMobileConversationListDividerColor } from 'hooks/Colors/useMobileConversationListDividerColor';
import { ConfigurationsButton } from './Buttons/ConfigurationsButton';
import { ConversationsButton } from './Buttons/ConversationsButton';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';
import { Wrapper } from 'components/SidebarBase/Wrapper';

export function Sidebar() {
  const { color: borderColor } = useMobileConversationListDividerColor();

  return (
    <Wrapper
      boxProps={{
        w: '100%',
        h: '4.5em',
        flexShrink: 0,
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
      }}
    >
      <Flex h='100%' align='center' w='100%'>
        <Avatar />
        <Flex flex='1' h='100%' align='center' ml='1.2em' gap='.3em'>
          <ConversationsButton />
          <ConfigurationsButton />
        </Flex>
      </Flex>
      <SignOutButton />
    </Wrapper>
  );
}
