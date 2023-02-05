import {
  DrawerContent,
  DrawerOverlay,
  Drawer as ChakraDrawer,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { Content } from './Content';

export function Drawer() {
  const { isOpen, onClose } = useTabToggle();

  return (
    <ChakraDrawer placement='left' isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxW={['265px', '295px', '335px']}>
        <DrawerCloseButton />
        <Content />
      </DrawerContent>
    </ChakraDrawer>
  );
}
