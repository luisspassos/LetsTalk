import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type ItemProps = {
  start: number;
  children: ReactNode;
} & DivProps;

// export function Item({ start, children, style, ...rest }: ItemProps) {
//   return (
//     // chakra element isn't being used to perform the list
//     <div
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         transform: `translateY(${start}px)`,
//         ...style,
//       }}
//       {...rest}
//     >
//       {children}
//     </div>
//   );
// }

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ start, style, children, ...rest }, ref) => (
    <div
      ref={ref}
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
  )
);

Item.displayName = 'Dynamic Virtualizer Item';
