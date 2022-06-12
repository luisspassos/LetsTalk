import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef, LegacyRef, ReactNode } from 'react';

type ScrollableBoxOfVirtualizedItemsProps = {
  children: ReactNode;
} & BoxProps;

export const ScrollableBoxOfVirtualizedItems = forwardRef(
  (
    { children, ...rest }: ScrollableBoxOfVirtualizedItemsProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    return (
      <Box ref={ref} willChange='transform' overflowY='auto' {...rest}>
        {children}
      </Box>
    );
  }
);

ScrollableBoxOfVirtualizedItems.displayName = 'ScrollableBoxOfVirtualizedItems';
