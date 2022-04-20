import { auth } from '../services/firebaseAdmin';

export type ConversationsIdType = string[] | undefined;

export async function formatConversations(
  conversationsId: ConversationsIdType
) {
  const conversationsIdInObjs = conversationsId?.map((id) => ({
    uid: id,
  }));

  if (conversationsIdInObjs) {
    const conversationUsers = (await auth.getUsers(conversationsIdInObjs))
      .users;

    const conversationsFormatted = conversationUsers.map(
      ({ displayName, photoURL, uid }) => ({
        uid,
        photoURL: photoURL ?? null,
        name: String(displayName?.split('#')[0]),
      })
    );

    return conversationsFormatted;
  }

  return [];
}

// onSnapshot
// ver foco na modal
// react query
// tela de loading
