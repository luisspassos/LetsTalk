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
    // chakra element isn't being used to perform the list

    <div
      style={{
        height: totalSize,
        position: 'relative',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
