import { useState } from 'react';
import { List } from './List';
import { SearchInput } from './SearchInput';

type ContentBasedOnSearchProps = {
  padding: string;
};

export function ContentBasedOnSearch({ padding }: ContentBasedOnSearchProps) {
  const [search, setSearch] = useState('');

  return (
    <>
      <SearchInput setSearch={setSearch} />
      <List search={search} padding={padding} />
    </>
  );
}
