import { Box, ChakraProps, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Base } from '../../ConversationsListBase';
import { styles as sharedStyles } from '..';
import { AddContactButton } from './Components/AddContactButton';
import { SearchInput } from './Components/SearchInput';
import { Title } from './Components/Title';
import { List } from './Components/List';
import { Divider } from 'components/ConversationsPage/Divider';

export function ConversationList() {
  const [search, setSearch] = useState('');

  const styles: ChakraProps = {
    padding: sharedStyles.px,
  };

  return (
    <Base overflowY='auto' h='100%' mx={`-${styles.padding}`}>
      <Box px={styles.padding}>
        <Flex pt='1em' pb='.6em' justify='space-between' align='center'>
          <Title />
          <AddContactButton />
        </Flex>
        <Divider mt={0} />
        <SearchInput setSearch={setSearch} />
      </Box>
      <List search={search} />
    </Base>
  );
}
