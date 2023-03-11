import { Flex } from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';
import { ContactInfo } from './ContactInfo';
import { SidebarToggleButton } from './SidebarToggleButton';

export function FirstContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { fontSize } = useFontSizeBasedOnWidth(ref.current?.offsetHeight, 4.7);

  return (
    <Flex
      fontSize={fontSize}
      ref={ref}
      w='100%'
      h='100%'
      minW={0}
      align='center'
      gap={['.7em', '1em']}
    >
      <SidebarToggleButton />
      <ContactInfo />
    </Flex>
  );
}
