import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

type ScrollableBoxOfVirtualizedItemsProps = {
  children: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type Ref = HTMLDivElement;

export const ScrollableBoxOfVirtualizedItems = forwardRef<
  Ref,
  ScrollableBoxOfVirtualizedItemsProps
>(({ children, style, ...rest }, ref) => {
  // chakra element isn't being used to perform the list

  return (
    <div ref={ref} style={{ overflowY: 'auto', ...style }} {...rest}>
      {children}
    </div>
  );
});

ScrollableBoxOfVirtualizedItems.displayName = 'ScrollableBoxOfVirtualizedItems';
