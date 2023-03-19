import { useRef } from 'react';
import { Ref } from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';
import { DividerAboveList } from './Divider/AboveList';
import { Parent } from './Parent';
import { Virtualizer } from './Virtualizer';

type ListProps = {
  search: string;
  padding: string;
};

export function List({ search, padding }: ListProps) {
  const parentRef = useRef<Ref>(null);

  return (
    <Parent padding={padding} parentRef={parentRef}>
      <DividerAboveList padding={padding} />
      <Virtualizer padding={padding} search={search} />
    </Parent>
  );
}
