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
      px={['11px', '13px', '15px']}
      py={['16px', '18px', '20px']}
      borderRight={useColorModeValue('unset', '1px solid')}
      borderRightColor={useColorModeValue('unset', 'whiteAlpha.500')}
      as='nav'
    >
      <Box>
        <Avatar />
        <VStack
          spacing={['11px', '13px', '15px']}
          mt={['22px', '26px', '30px']}
        >
          <ConversationsButton />
          <ConfigurationsButton />
        </VStack>
      </Box>
      <SignOutButton />
    </Flex>
  );
}
