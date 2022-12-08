import { useDisclosure } from '@chakra-ui/react';

export type ConversationDocWithContactData =
  | {
      users: ConversationUsersId;
      usersParticipating: [string] | ConversationUsersId;
    }
  | undefined;

export type ConversationUsersId = [string, string];

export type ContactsResponse = {
  users: {
    displayName: string;
    photoURL: string | undefined;
    uid: string;
  }[];
};

export type OnlineAt = number | 'now';

export type UseDisclosure = ReturnType<typeof useDisclosure>;
