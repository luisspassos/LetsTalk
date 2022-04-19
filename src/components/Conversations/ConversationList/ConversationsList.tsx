import { Flex, Heading, VStack } from '@chakra-ui/react';
import { useConversationsTab } from '../../../contexts/ConversationsTabContext';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from '../Divider';
import { AddContactButton } from './AddContactButton';
import { SearchInput } from './SearchInput';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';

export function ConversationListComponent() {
  const { isOpen } = useConversationsTab();
  const { user } = useAuth();

  const username = user?.username as string;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'conversations', username), (doc) => {
      console.log(doc.data());
    });

    return () => {
      unsub();
    };
  }, [username]);

  const arr = [1, 2, 3, 4];

  return (
    <Flex
      display={isOpen ? 'flex' : 'none'}
      w={['265px', '295px', '335px']}
      h='100vh'
      bg='gray.200'
      p={['19px 19px 0', '22px 22px 0', '25px 25px 0']}
      direction='column'
    >
      <AddContactButton />
      <Divider />
      <SearchInput />
      <Heading
        as='h1'
        fontWeight={400}
        fontSize={['22px', '26px', '30px']}
        mb={['7px', '10px', '13px']}
      >
        Conversas
      </Heading>
      <VStack
        overflowY='auto'
        pb={['6px', '8px', '10px']}
        mx={['-19px', '-22px', '-25px']}
        spacing={0}
      >
        <ConversationDivider position='sticky' top={0} left={0} mt={0} />
        {arr.map((el, i) => (
          <Conversation key={el} arr={arr} index={i} />
        ))}
      </VStack>
    </Flex>
  );
}
