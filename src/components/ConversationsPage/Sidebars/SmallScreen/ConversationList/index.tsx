import { Box, ChakraProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Base } from '../../ConversationsListBase';
import { styles as sharedStyles } from '..';
import { SearchInput } from './Components/SearchInput';
import { List } from './Components/List';
import { Divider } from 'components/ConversationsPage/Divider';
import { FirstContent } from './FirstContent';

export function ConversationList() {
  const [search, setSearch] = useState('');

  const styles: ChakraProps = {
    padding: sharedStyles.px,
  };

  return (
    <Base overflowY='auto' h='100%' mx={`-${styles.padding}`}>
      <Box px={styles.padding}>
        <FirstContent />
        <Divider mt={0} />
        <SearchInput setSearch={setSearch} />
      </Box>
      <List search={search} />
    </Base>
  );
}
