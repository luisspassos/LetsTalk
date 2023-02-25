import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { Sidebar2 } from 'components/Sidebar/Sidebar2';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ConversationList } from './ConversationList';

export function Small() {
  const { isOpen, onClose } = useTabToggle();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='full'>
      <DrawerOverlay />
      <DrawerContent fontSize='1rem'>
        <Sidebar2 />
        <ConversationList />
      </DrawerContent>
    </Drawer>
  );
}
