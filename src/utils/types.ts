import { FieldError } from 'react-hook-form/dist/types';

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

export type InputError = FieldError | undefined;
