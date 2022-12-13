import { useBreakpointValue } from '@chakra-ui/react';
import { Content } from './Content';
import { Drawer } from './Drawer';

export function ConversationList() {
  const Component = useBreakpointValue({
    base: Drawer,
    md: Content,
  }) as React.FC;

  return <Component />;
}
