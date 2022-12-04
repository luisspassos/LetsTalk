import { useRef } from 'react';
import { Ref } from '../../../../Virtualizer/ScrollableBoxOfVirtualizedItems';
import { DividerUnderTitle } from '../DividerUnderTitle';
import { Parent } from './Parent';
import { Virtualizer } from './Virtualizer';

type ListProps = {
  search: string;
};

export function List({ search }: ListProps) {
  const parentRef = useRef<Ref>(null);

  return (
    <Parent ref={parentRef}>
      <DividerUnderTitle />
      <Virtualizer ref={parentRef} search={search} />
    </Parent>
  );
}
