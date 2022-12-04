import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type HTMLProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ItemProps = {
  start: number;
  children: ReactNode;
} & HTMLProps;

export function Item({ start, children, style, ...rest }: ItemProps) {
  // chakra element isn't being used to perform the list

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${start}px)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
