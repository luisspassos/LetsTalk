import { ReactNode, RefObject } from 'react';
import {
  Ref,
  ScrollableBoxOfVirtualizedItems,
} from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';

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
        paddingBottom: '5%',
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
