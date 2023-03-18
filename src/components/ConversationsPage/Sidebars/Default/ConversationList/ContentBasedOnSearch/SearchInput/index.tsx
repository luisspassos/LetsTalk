import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { useRef } from 'react';
import {
  Base,
  SearchInputProps as BaseProps,
} from 'components/ConversationsPage/Sidebars/ConversationsListBase/SearchInput';
import { Icon } from './Icon';
import { Input } from './Input';

type SearchInputProps = {
  setSearch: BaseProps['setSearch'];
};

export function SearchInput({ setSearch }: SearchInputProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { fontSize } = useFontSizeBasedOnMeasurement(ref.current, 17.5);

  return (
    <Base
      componentRef={ref}
      fontSize={`max(${fontSize}, 0.9375rem)`}
      setSearch={setSearch}
      Icon={Icon}
      Input={Input}
    />
  );
}
