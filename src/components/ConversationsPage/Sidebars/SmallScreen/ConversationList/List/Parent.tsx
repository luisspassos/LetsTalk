import {
  ScrollableBoxOfVirtualizedItems,
  Ref,
} from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';
import { ReactNode, RefObject } from 'react';

type ParentProps = {
  children: ReactNode;
  parentRef: RefObject<Ref>;
};

export function Parent({ children, parentRef }: ParentProps) {
  return (
    <ScrollableBoxOfVirtualizedItems
      ref={parentRef}
      style={{
        paddingBottom: '1em',
      }}
    >
      {children}
    </ScrollableBoxOfVirtualizedItems>
  );
}
