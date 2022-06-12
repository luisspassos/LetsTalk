import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type VirtualizedItemsListWrapperProps = {
  children: ReactNode;
  totalSize: number;
};

export function VirtualizedItemsListWrapper({
  children,
  totalSize,
}: VirtualizedItemsListWrapperProps) {
  return (
    <Box h={`${totalSize}px`} pos='relative' w='100%'>
      {children}
    </Box>
  );
}
