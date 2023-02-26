import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { Sidebar2 } from 'components/Sidebar/Sidebar2';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ConversationList } from './ConversationList';

type Styles = {
  px: string;
};

export const styles: Styles = {
  px: '1.2em',
};

export function Small() {
  const { isOpen, onClose } = useTabToggle();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='full'>
      <DrawerOverlay />
      <DrawerContent
        bg={useColorModeValue('gray.200', 'blue.900')}
        fontSize='1rem'
        px={styles.px}
      >
        <Sidebar2 />
        <ConversationList />
      </DrawerContent>
    </Drawer>
  );
}
