import { Flex } from '@chakra-ui/react';
import { ContactInfo } from './ContactInfo';
import { SidebarToggleButton } from './SidebarToggleButton';

export function FirstContent() {
  return (
    <Flex w='100%' h='100%' minW={0} align='center' gap={['.7em', '1em']}>
      <SidebarToggleButton />
      <ContactInfo />
    </Flex>
  );
}
