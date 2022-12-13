import { Text, useColorModeValue } from '@chakra-ui/react';
import { onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useConversations } from '../../../../../contexts/ConversationsContext';
import { db } from '../../../../../services/firebase';
import { formatContactOnlineAt } from '../../../../../utils/formatDate';
import { OnlineAt } from '../../../../../utils/types';

type OnlineAtFormatted = string;

type ContactDocumentData = {
  onlineAt: OnlineAt;
  uid: string;
};

export function OnlineAt() {
  const [onlineAt, setOnlineAt] = useState<OnlineAtFormatted>();
  const { currentConversation } = useConversations();

  useEffect(() => {
    function getOnlineAt() {
      if (!currentConversation.data?.username) return;

      const unsub = onSnapshot(
        doc(db, 'users', currentConversation.data.username),
        (doc) => {
          const docData = doc.data() as ContactDocumentData;

          const onlineAtFormatted = formatContactOnlineAt(docData.onlineAt);

          setOnlineAt(onlineAtFormatted);
        }
      );

      return unsub;
    }

    const unsub = getOnlineAt();

    return () => {
      unsub && unsub();
    };
  }, [currentConversation.data?.username]);

  return (
    <Text
      as='time'
      fontSize={['12px', '13px', '14px']}
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
    >
      {onlineAt}
    </Text>
  );
}
