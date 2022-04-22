export type UserConversationsDataType =
  | Record<
      string,
      {
        messages: {
          message: string;
        }[];
      }
    >
  | undefined;

type ConversationUsersResponse = {
  users: {
    displayName: string;
    photoURL: string | undefined;
    uid: string;
  }[];
};

export async function getConversations(
  userConversationsData: UserConversationsDataType
) {
  if (!userConversationsData) return [];

  const { api } = await import('../services/api');

  const conversationUsersId = Object.keys(userConversationsData);
  const conversationUsersIdFormatted = conversationUsersId.join(',');

  const conversationUsers = (
    await api.get<ConversationUsersResponse>(
      `getUsers?usersId=${conversationUsersIdFormatted}`
    )
  ).data.users;

  const lastMessages = conversationUsersId.map(
    (id) => userConversationsData[id].messages.pop()?.message
  );

  const conversations = conversationUsers.map(
    ({ displayName, photoURL, uid }, i) => ({
      uid,
      photoURL: photoURL ?? null,
      name: String(displayName?.split('#')[0]),
      lastMessage: lastMessages[i] ?? '',
    })
  );

  return conversations;
}
