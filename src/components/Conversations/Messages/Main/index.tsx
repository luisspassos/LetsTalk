import { Stack } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useConversations } from '../../../../contexts/ConversationsContext';
import { db } from '../../../../services/firebase';
import { ConversationDocWithContactData } from '../../../../types';
import { Message } from './Message';

type DbMessageData = {
  author: string;
  message: string;
  sentIn: number;
};

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

      const currentConversationDocId = currentConversationDoc?.id as string;

      const messagesRef = collection(
        db,
        'conversations',
        currentConversationDocId,
        'messages'
      );

      const messageDocs = await getDocs(messagesRef);

      const { formatMessageSentIn } = await import(
        '../../../../utils/formatDate'
      );

      const messagesFormatted = messageDocs.docs.map((message) => {
        const messageData = message.data() as DbMessageData;

        return {
          id: message.id,
          message: messageData.message,
          contactMessage: messageData.author !== user.uid,
          sentIn: formatMessageSentIn(messageData.sentIn),
        };
      });

      setMessages(messagesFormatted);
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
