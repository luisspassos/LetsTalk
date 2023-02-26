import { SearchInput } from './Components/SearchInput';
import React, { useState } from 'react';
import { Title } from './Components/Title';
import { Container } from './Components/Container';
import { List } from './Components/List';
import { Box, Flex } from '@chakra-ui/react';
import { AddContactButton } from './Components/AddContactButton';
import { Divider } from 'components/ConversationsPage/Divider';
import { styles } from '..';

export function ConversationList() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <>
        <Box px={styles.px}>
          <Flex justify='space-between' align='center'>
            <Title />
            <AddContactButton />
          </Flex>
          <Divider />
          <SearchInput setSearch={setSearch} />
        </Box>
        <List search={search} />
      </>
    </Container>
  );
}
