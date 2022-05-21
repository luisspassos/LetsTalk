import { Stack } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { db } from '../../../../services/firebase';
import { ConversationDocWithContactData } from '../../../../types';
import { Message } from './Message';

type Message = {
  id: string;
  sentIn: string;
  message: string;
  contactMessage: boolean;
};

export function Main() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = useAuth();

  const {
    currentConversation: { data: contact },
  } = useConversations();

  useEffect(() => {
    async function getMessages() {
      const conversationsRef = query(
        collection(db, 'conversations'),
        where('usersParticipating', 'array-contains', user.uid)
      );

      const conversationsSnap = await getDocs(conversationsRef);

      if (conversationsSnap.empty) return;

      const currentConversationDoc = conversationsSnap.docs.find((doc) => {
        const docData = doc.data() as ConversationDocWithContactData;

        return docData?.users.includes(contact.uid);
      });

      const currentConversationDocId = currentConversationDoc?.id;

      const messagesRef = collection(db, 'conversations');
    }

    getMessages();
  }, [user.uid, contact.uid]);

  return (
    <Stack
      overflow='auto'
      as='main'
      py={['14px', '17px', '20px']}
      pr={['14px', '17px', '20px']}
      mr={['-14px', '-17px', '-20px']}
      spacing={['6px', '8px', '10px']}
    >
      {messages.map(({ contactMessage, id, message, sentIn }) => (
        <Message
          contactMessage={contactMessage}
          message={message}
          key={id}
          sentIn={sentIn}
        />
      ))}
    </Stack>
  );
}
