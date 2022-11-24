import { ReactNode } from 'react';

type ItemProps = {
  start: number;
  children: ReactNode;
};

export function Item({ start, children }: ItemProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${start}px)`,
      }}
    >
      {children}
    </div>
  );
}
