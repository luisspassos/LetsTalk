import { Box, useColorModeValue, VStack } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { SignOutButton } from './Buttons/SignOutButton';
import { Wrapper } from 'components/SidebarBase/Wrapper';
import { RouteButtons } from './Buttons/RouteButtons';

export function Sidebar() {
  return (
    <Wrapper
      boxProps={{
        maxW: '5.25rem',
        minW: '4.0625rem',
        w: '5.5%',
        bg: useColorModeValue('gray.500', 'blue.900'),
      }}
      flexProps={{
        direction: 'column',
        borderRight: useColorModeValue('unset', '1px solid'),
        borderRightColor: useColorModeValue('unset', 'whiteAlpha.500'),
        px: '17%',
        py: '25%',
      }}
    >
      <Box>
        <Avatar />
        <VStack spacing='32%' mt='64%'>
          <RouteButtons />
        </VStack>
      </Box>
      <SignOutButton />
    </Wrapper>
  );
}
