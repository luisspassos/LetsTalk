import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ConversationList } from './ConversationList';

type Styles = {
  px: string;
};

export const styles: Styles = {
  px: '1.2em',
};

export function SmallScreen() {
  const { isOpen, onClose } = useTabToggle();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='full' autoFocus={false}>
      <DrawerOverlay />
      <DrawerContent
        bg={useColorModeValue('gray.200', 'blue.900')}
        fontSize='1rem'
        px={styles.px}
      >
        <Sidebar />
        <ConversationList />
      </DrawerContent>
    </Drawer>
  );
}
