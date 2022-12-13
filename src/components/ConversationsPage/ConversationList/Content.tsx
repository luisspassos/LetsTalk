import { AddContactButton } from './Components/AddContactButton';
import { SearchInput } from './Components/SearchInput';
import React, { useState } from 'react';
import { Divider } from '../Divider';
import { Title } from './Components/Title';
import { Container } from './Components/Container';
import { List } from './Components/List';

export function Content() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <AddContactButton />
      <Divider />
      <SearchInput setSearch={setSearch} />
      <Title />
      <List search={search} />
    </Container>
  );
}
