import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';
import { ConfigurationsButton } from './Buttons/ConfigurationsButton';
import { ConversationsButton } from './Buttons/ConversationsButton';

export function Sidebar() {
  return (
    <Flex
      bg={useColorModeValue('gray.500', 'blue.900')}
      direction='column'
      justify='space-between'
      align='center'
      py='1.8%'
      px='1%'
      w='5.5%'
      borderRight={useColorModeValue('unset', '1px solid')}
      borderRightColor={useColorModeValue('unset', 'whiteAlpha.500')}
      as='nav'
    >
      <Box>
        <Avatar />
        <VStack spacing='32%' mt='64%'>
          <ConversationsButton />
          <ConfigurationsButton />
        </VStack>
      </Box>
      <SignOutButton />
    </Flex>
  );
}
