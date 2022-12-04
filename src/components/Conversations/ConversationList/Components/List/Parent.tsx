import { useBreakpointValue } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';
import {
  Ref,
  ScrollableBoxOfVirtualizedItems,
} from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';

type ParentProps = {
  children: ReactNode;
};

export const Parent = forwardRef<Ref, ParentProps>(
  ({ children }, parentRef) => {
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
);

Parent.displayName = 'Parent';
