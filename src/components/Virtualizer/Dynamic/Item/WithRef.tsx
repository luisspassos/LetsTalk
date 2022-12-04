import { forwardRef } from 'react';
import { Item, ItemProps } from '.';

export type Ref = HTMLDivElement;

// don't need this

export const ItemWithRef = forwardRef<Ref, ItemProps>(
  ({ start, children, ...rest }, ref) => (
    <Item start={start} ref={ref} {...rest}>
      {children}
    </Item>
  )
);

ItemWithRef.displayName = 'Item with ref';
