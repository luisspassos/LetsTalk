import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ConversationList } from './ConversationList';

export function Small() {
  const { isOpen, onClose } = useTabToggle();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='full'>
      <DrawerOverlay />
      <DrawerContent>
        {/* <Sidebar2 /> */}
        <Box>hi</Box>
        {/* <Box h='100%'>Hello world</Box> */}
        <ConversationList />
      </DrawerContent>
    </Drawer>
  );
}
