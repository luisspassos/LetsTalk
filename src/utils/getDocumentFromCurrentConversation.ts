import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ConversationDocWithContactData } from '../types';

export async function getDocumentFromCurrentConversation(
  userId: string,
  contactId: string
) {
  const conversationsRef = collection(db, 'conversations');

  const userConversationsRef = query(
    conversationsRef,
    where('users', 'array-contains', userId)
  );

  const userConversationsSnap = async () => await getDocs(userConversationsRef);

  const conversationDocWithContact = (await userConversationsSnap()).docs.find(
    (doc) => {
      const docData = doc.data() as ConversationDocWithContactData;

      return docData?.users.includes(contactId);
    }
  );

  return { userConversationsSnap, conversationDocWithContact };
}
