import { api } from '../services/api';

export type ConversationsIdType = string[] | undefined;

type ConversationUsersResponse = {
  users: {
    displayName: string;
    photoURL: string | undefined;
    uid: string;
  }[];
};

export async function formatConversations(
  conversationsId: ConversationsIdType
) {
  const conversationsIdFormatted = conversationsId?.join(',');

  if (conversationsIdFormatted) {
    const conversationUsers = (
      await api.get<ConversationUsersResponse>(
        `getUsers?usersId=${conversationsIdFormatted}`
      )
    ).data.users;

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
