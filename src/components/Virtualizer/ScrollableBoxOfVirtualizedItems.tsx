import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type HTMLProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type ScrollableBoxOfVirtualizedItemsProps = {
  children: ReactNode;
} & HTMLProps;

export type Ref = HTMLDivElement;

export function ScrollableBoxOfVirtualizedItems({
  children,
  style,
  ...rest
}: ScrollableBoxOfVirtualizedItemsProps) {
  return (
    <div style={{ overflowY: 'auto', ...style }} {...rest}>
      {children}
    </div>
  );
}

ScrollableBoxOfVirtualizedItems.displayName = 'ScrollableBoxOfVirtualizedItems';
