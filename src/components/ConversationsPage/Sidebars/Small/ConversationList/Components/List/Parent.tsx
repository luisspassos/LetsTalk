import {
  ScrollableBoxOfVirtualizedItems,
  Ref,
} from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';
import { ReactNode, RefObject } from 'react';
import { styles } from '../../..';

type ParentProps = {
  children: ReactNode;
  parentRef: RefObject<Ref>;
  padding: string;
};

export function Parent({ children, parentRef, padding }: ParentProps) {
  return (
    <ScrollableBoxOfVirtualizedItems
      ref={parentRef}
      style={{
        marginInline: `-${styles.px}`,
        paddingBottom: '1em',
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
