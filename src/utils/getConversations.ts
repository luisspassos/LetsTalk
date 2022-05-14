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
import { formatContactsUpdatedAt } from './formatDate';

export type ContactsResponse = {
  users: {
    displayName: string;
    photoURL: string | undefined;
    uid: string;
  }[];
};

export type ConversationUsersId = [string, string];

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

  const contactInformation = contactInformationDocs.map((doc) => ({
    updatedAt: formatContactsUpdatedAt(doc.data()?.updatedAt),
  }));

  const contactData = (
    await api.get<ContactsResponse>(`getUsers?usersId=${contactsIdFormatted}`)
  ).data.users;

  const contactDataFormatted = contactData.map(
    ({ displayName, uid, photoURL }, i) => ({
      name: displayName.split('#')[0],
      photoURL: photoURL ?? null,
      uid,
      updatedAt: contactInformation[i].updatedAt,
    })
  );

  return contactDataFormatted;
}
