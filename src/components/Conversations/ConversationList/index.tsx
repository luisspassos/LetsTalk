import { useBreakpointValue } from '@chakra-ui/react';
import { ConversationListComponent } from './ConversationsList';
import { Drawer } from './Drawer';

export function ConversationList() {
  const Component = useBreakpointValue({
    base: Drawer,
    md: ConversationListComponent,
  }) as React.FC;

  return <Component />;
}
