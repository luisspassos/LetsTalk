import { useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  HTMLProps,
  ScrollableBoxOfVirtualizedItems,
} from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';

type ParentProps = {
  children: ReactNode;
} & HTMLProps;

export function Parent({ children, ...rest }: ParentProps) {
  const styles = {
    pb: useBreakpointValue(['6px', '8px', '10px']),
    mx: useBreakpointValue(['-19px', '-22px', '-25px']),
  };

  return (
    <ScrollableBoxOfVirtualizedItems
      style={{
        paddingBottom: styles.pb,
        margin: `0 ${styles.mx}`,
      }}
      {...rest}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
