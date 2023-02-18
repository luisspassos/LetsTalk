import { Divider } from '.';

type DividerAboveListProps = {
  padding: string;
};

export function DividerAboveList({ padding }: DividerAboveListProps) {
  return (
    <Divider
      widthToBeRemoved={padding}
      position='sticky'
      top={0}
      left={0}
      mx='auto'
    />
  );
}
