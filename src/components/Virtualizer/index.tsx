import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { useVirtual } from 'react-virtual';

export type HTMLProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type MeasureRef = ReturnType<
  typeof useVirtual
>['virtualItems'][0]['measureRef'];

export type ItemProps = {
  start: number;
  children: ReactNode;
  measureRef?: MeasureRef;
} & HTMLProps;

export function Item({
  start,
  children,
  style,
  measureRef,
  ...rest
}: ItemProps) {
  // chakra element isn't being used to perform the list

  return (
    <div
      ref={measureRef}
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
