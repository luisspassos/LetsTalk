import { SearchInput } from './Components/SearchInput';
import React, { useState } from 'react';
import { Title } from './Components/Title';
import { Container } from './Components/Container';
import { List } from './Components/List';
import { Flex } from '@chakra-ui/react';
import { AddContactButton } from './Components/AddContactButton';
import { Divider } from 'components/ConversationsPage/Divider';

export function ConversationList() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      {(padding) => (
        <>
          <Flex justify='space-between' align='center'>
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
