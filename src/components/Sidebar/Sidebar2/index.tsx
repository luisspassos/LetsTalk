import {
  Box,
  Flex,
  FlexProps,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ConfigurationsButton } from '../Buttons/ConfigurationsButton';
import { ConversationsButton } from '../Buttons/ConversationsButton';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';

type SidebarProps = FlexProps;

export function Sidebar2(props: SidebarProps) {
  return (
    <Box
      bg={useColorModeValue('gray.500', 'blue.900')}
      w='100%'
      h='100%'
      borderBottom={useColorModeValue('unset', '1px solid')}
      borderBottomColor={useColorModeValue('unset', 'whiteAlpha.500')}
      as='nav'
    >
      <Flex
        justify='space-between'
        align='center'
        w='100%'
        h='100%'
        // px='17%'
        // py='25%'
        {...props}
      >
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
