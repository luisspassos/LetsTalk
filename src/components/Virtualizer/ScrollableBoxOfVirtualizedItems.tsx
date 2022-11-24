import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

type ScrollableBoxOfVirtualizedItemsProps = {
  children: ReactNode;
} & BoxProps;

export const ScrollableBoxOfVirtualizedItems = forwardRef<
  HTMLDivElement,
  ScrollableBoxOfVirtualizedItemsProps
>(({ children, ...rest }, ref) => {
  return (
    <Box ref={ref} overflowY='auto' {...rest}>
      {children}
    </Box>
  );
});

ScrollableBoxOfVirtualizedItems.displayName = 'ScrollableBoxOfVirtualizedItems';
