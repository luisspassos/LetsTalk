import { Circle } from '../../../../../../Circle';

type NumberOfUnreadMessagesProps = {
  number: number;
};

export function NumberOfUnreadMessages({
  number,
}: NumberOfUnreadMessagesProps) {
  return (
    <Circle
      px={['1px', '2px', '3px']}
      minW={['13.5px', '16.5px', '19.5px']}
      h={['13.5px', '16.5px', '19.5px']}
      fontSize={['9px', '11px', '13px']}
      lineHeight={['0px', '0.5px', '1px']}
      color='white'
      bg='gray.500'
    >
      {number}
    </Circle>
  );
}
