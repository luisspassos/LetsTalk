import { Flex } from '@chakra-ui/react';
import { useElementWidth } from 'hooks/useElementWidth';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { ContactInfo } from './ContactInfo';
import { SidebarToggleButton } from './SidebarToggleButton';

export function FirstContent() {
  const { ref, width: parentWidth } = useElementWidth<HTMLDivElement>();

  const { fontSize } = useFontSizeBasedOnWidth(ref.current, 48);

  return (
    <Flex
      fontSize={fontSize}
      ref={ref}
      w='100%'
      h='100%'
      minW={0}
      align='center'
      gap='2%'
    >
      <SidebarToggleButton />
      <ContactInfo parentWidth={parentWidth} />
    </Flex>
  );
}
