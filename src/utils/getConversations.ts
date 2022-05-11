import { collection, getDocs, query, where } from 'firebase/firestore';
import { api } from '../services/api';
import { db } from '../services/firebase';

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
    where('users', 'array-contains', currentUserId)
  );

  const conversationsSnap = await getDocs(conversationsRef);

  if (conversationsSnap.empty) return [];

  const contactsId = conversationsSnap.docs.map((doc) => {
    const conversationUsersId = doc.data().users as ConversationUsersId;

    return conversationUsersId.find((id) => id !== currentUserId);
  });

  const contactsIdFormatted = contactsId.join(',');

  const contactData = (
    await api.get<ContactsResponse>(`getUsers?usersId=${contactsIdFormatted}`)
  ).data.users;

  const contactDataFormatted = contactData.map(
    ({ displayName, uid, photoURL }) => ({
      name: displayName.split('#')[0],
      photoURL: photoURL ?? null,
      uid,
    })
  );

  return contactDataFormatted;
}
