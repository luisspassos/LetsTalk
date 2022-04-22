export type UserConversationsDataType =
  | Record<
      string,
      {
        updated: number;
        messages:
          | {
              message: string;
            }[]
          | undefined;
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

  const databaseData = conversationUsersId.map((id) => ({
    lastMessage: userConversationsData[id].messages?.pop()?.message ?? '',
    updated: userConversationsData[id].updated,
  }));

  const conversations = conversationUsers
    .map(({ displayName, photoURL, uid }, i) => ({
      uid,
      photoURL: photoURL ?? null,
      name: String(displayName?.split('#')[0]),
      lastMessage: databaseData[i].lastMessage,
      updated: databaseData[i].updated,
    }))
    .sort((a, b) => a.updated - b.updated)
    .reverse();

  return conversations;
}
