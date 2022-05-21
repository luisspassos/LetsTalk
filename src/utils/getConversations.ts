import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { api } from '../services/api';
import { db } from '../services/firebase';
import { ContactsResponse, ConversationUsersId } from '../types';
import { formatContactsUpdatedAt } from './formatDate';

type MessageDoc =
  | {
      message: string;
    }
  | undefined;

export async function getConversations(currentUserId: string) {
  const conversationsRef = query(
    collection(db, 'conversations'),
    where('usersParticipating', 'array-contains', currentUserId)
  );

  const conversationsSnap = await getDocs(conversationsRef);

  if (conversationsSnap.empty) return [];

  const conversationDocumentsId = conversationsSnap.docs.map(({ id }) => id);

  const contactsId = conversationsSnap.docs.map((doc) => {
    const conversationUsersId = doc.data().users as ConversationUsersId;

    return conversationUsersId.find((id) => id !== currentUserId);
  }) as string[];

  const contactsIdFormatted = contactsId.join(',');

  const contactInformationDocs = await Promise.all(
    conversationDocumentsId.map((id, i) => {
      const contactsInformationRef = doc(
        db,
        'conversations',
        id,
        'usersInformation',
        contactsId[i]
      );

      const contactsInformationSnap = getDoc(contactsInformationRef);

      return contactsInformationSnap;
    })
  );

  const messagesDocs = await Promise.all(
    conversationDocumentsId.map((id) => {
      const messagesRef = collection(db, 'conversations', id, 'messages');

      const messagesSnap = getDocs(messagesRef);

      return messagesSnap;
    })
  );

  const lastMessages = messagesDocs.map((doc) => {
    const docData = doc.docs.pop()?.data() as MessageDoc;

    return docData?.message ?? '';
  });

  const contactInformation = contactInformationDocs.map((doc) => ({
    updatedAt: formatContactsUpdatedAt(doc.data()?.updatedAt),
  }));

  const contactData = (
    await api.get<ContactsResponse>(`getUsers?usersId=${contactsIdFormatted}`)
  ).data.users;

  const contactDataFormatted = contactData.map(
    ({ displayName, uid, photoURL }, i) => ({
      uid,
      photoURL: photoURL ?? null,
      name: displayName.split('#')[0],
      username: displayName,
      updatedAt: contactInformation[i].updatedAt,
      lastMessage: lastMessages[i],
    })
  );

  return contactDataFormatted;
}
