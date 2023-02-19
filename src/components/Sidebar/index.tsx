import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';
import { ConfigurationsButton } from './Buttons/ConfigurationsButton';
import { ConversationsButton } from './Buttons/ConversationsButton';

export function Sidebar() {
  return (
    <Box
      bg={useColorModeValue('gray.500', 'blue.900')}
      w='5.5%'
      minW='4.0625rem'
      maxW='5.25rem'
      as='nav'
    >
      <Flex
        direction='column'
        justify='space-between'
        align='center'
        w='100%'
        h='100%'
        borderRight={useColorModeValue('unset', '1px solid')}
        borderRightColor={useColorModeValue('unset', 'whiteAlpha.500')}
        px='17%'
        py='25%'
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
    </Box>
  );
}
