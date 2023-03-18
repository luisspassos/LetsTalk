import { Box, ChakraProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Base } from '../../ConversationsListBase';
import { styles as sharedStyles } from '..';
import { SearchInput } from './SearchInput';
import { List } from './List';
import { FirstContent } from './FirstContent';
import { DividerBelowTitle } from './DividerBelowTitle';

export function ConversationList() {
  const [search, setSearch] = useState('');

  const styles: ChakraProps = {
    padding: sharedStyles.px,
  };

  return (
    <Base overflowY='auto' h='100%' mx={`-${styles.padding}`}>
      <Box px={styles.padding}>
        <FirstContent />
        <DividerBelowTitle />
        <SearchInput setSearch={setSearch} />
      </Box>
      <List search={search} />
    </Base>
  );
}
