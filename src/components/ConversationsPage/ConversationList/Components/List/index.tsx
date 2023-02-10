import { useRef } from 'react';
import { Ref } from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';
import { DividerAboveList } from '../DividerAboveList';
import { Parent } from './Parent';
import { Virtualizer } from './Virtualizer';

type ListProps = {
  search: string;
  padding: string;
};

export function List({ search, padding }: ListProps) {
  const parentRef = useRef<Ref>(null);

  return (
    <Parent paddingToBeRemoved={padding} parentRef={parentRef}>
      <DividerAboveList />
      <Virtualizer padding={padding} parentRef={parentRef} search={search} />
    </Parent>
  );
}
