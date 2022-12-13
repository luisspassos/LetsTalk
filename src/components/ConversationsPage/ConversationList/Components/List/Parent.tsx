import { useBreakpointValue } from '@chakra-ui/react';
import { ReactNode, RefObject } from 'react';
import {
  Ref,
  ScrollableBoxOfVirtualizedItems,
} from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';

type ParentProps = {
  children: ReactNode;
  parentRef: RefObject<Ref>;
};

export function Parent({ children, parentRef }: ParentProps) {
  const styles = {
    pb: useBreakpointValue(['6px', '8px', '10px']),
    mx: useBreakpointValue(['-19px', '-22px', '-25px']),
  };

  return (
    <ScrollableBoxOfVirtualizedItems
      ref={parentRef}
      style={{
        paddingBottom: styles.pb,
        margin: `0 ${styles.mx}`,
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
