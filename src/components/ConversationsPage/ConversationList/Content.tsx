import { SearchInput } from './Components/SearchInput';
import React, { useState } from 'react';
import { Divider } from '../Divider';
import { Title } from './Components/Title';
import { Container } from './Components/Container';
import { List } from './Components/List';
import { Flex } from '@chakra-ui/react';
import { AddContactButton } from './Components/AddContactButton';

export function Content() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      {(padding) => (
        <>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            align={{ base: 'start', md: 'center' }}
          >
            <Title />
            <AddContactButton />
          </Flex>

          <Divider />
          <SearchInput setSearch={setSearch} />
          <List search={search} padding={padding} />
        </>
      )}
    </Container>
  );
}
