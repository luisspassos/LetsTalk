import { Ref } from 'components/Virtualizer/ScrollableBoxOfVirtualizedItems';
import { useRef } from 'react';
import { DividerAboveList } from './Divider/AboveList';
import { Parent } from './Parent';
import { Virtualizer } from './Virtualizer';

type ListProps = {
  search: string;
};

export function List({ search }: ListProps) {
  const parentRef = useRef<Ref>(null);

  return (
    <Parent parentRef={parentRef}>
      <DividerAboveList />
      <Virtualizer search={search} />
    </Parent>
  );
}
