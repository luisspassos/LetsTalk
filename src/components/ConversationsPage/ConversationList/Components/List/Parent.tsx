import { useBreakpointValue } from '@chakra-ui/react';
import { ReactNode, RefObject } from 'react';
import {
  Ref,
  ScrollableBoxOfVirtualizedItems,
} from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';

type ParentProps = {
  children: ReactNode;
  parentRef: RefObject<Ref>;
  paddingToBeRemoved: string;
};

export function Parent({
  children,
  parentRef,
  paddingToBeRemoved,
}: ParentProps) {
  const styles = {
    pb: useBreakpointValue(['6px', '8px', '10px']),
  };

  return (
    <ScrollableBoxOfVirtualizedItems
      ref={parentRef}
      style={{
        marginInline: `-${paddingToBeRemoved}`,
        paddingBottom: styles.pb,
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
