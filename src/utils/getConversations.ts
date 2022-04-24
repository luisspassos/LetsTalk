export type MessagesType =
  | {
      id: string;
      contactMessage: boolean;
      message: string;
      createdAt: number;
    }[]
  | undefined;

export type UserConversationsDataType =
  | Record<
      string,
      {
        updatedAt: number;
        messages: MessagesType;
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

  const databaseData = conversationUsersId.map((id) => {
    const messages = userConversationsData[id].messages;
    const lastMessage = messages ? messages[messages.length - 1].message : '';
    const updatedAt = userConversationsData[id].updatedAt;

    return {
      messages,
      lastMessage,
      updatedAt,
    };
  });

  const conversations = conversationUsers
    .map(({ displayName, photoURL, uid }, i) => ({
      uid,
      photoURL: photoURL ?? null,
      name: String(displayName?.split('#')[0]),
      lastMessage: databaseData[i].lastMessage,
      updatedAt: databaseData[i].updatedAt,
      messages: databaseData[i].messages,
    }))
    .sort((a, b) => a.updatedAt - b.updatedAt)
    .reverse();

  return conversations;
}
