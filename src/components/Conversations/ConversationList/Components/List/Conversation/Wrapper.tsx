import { ReactNode } from 'react';
import { HTMLProps, Item } from '../../../../../Virtualizer';

type WrapperProps = {
  start: number;
  style: HTMLProps['style'];
  children: ReactNode;
};

export function Wrapper({ start, style, children }: WrapperProps) {
  return (
    <Item
      start={start}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </Item>
  );
}
