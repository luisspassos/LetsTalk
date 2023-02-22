import {
  ScrollableBoxOfVirtualizedItems,
  Ref,
} from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';
import { ReactNode, RefObject } from 'react';

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
        marginInline: `-${padding}`,
        paddingBottom: '1em',
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
