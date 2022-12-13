import { UseFormRegister } from 'react-hook-form';
import { FieldError, UseFormReturn } from 'react-hook-form/dist/types';

export type ConversationUsersId = [string, string];

export type FullConversationDocData = {
  users: ConversationUsersId;
  usersParticipating: ConversationUsersId | [string];
};

export type ConversationDocWithContactData =
  | FullConversationDocData
  | undefined;

export type ContactsResponse = {
  users: {
    displayName: string;
    photoURL: string | undefined;
    uid: string;
  }[];
};

export type OnlineAt = number | 'now';

export type InputProps = {
  register: UseFormRegister<any>;
  error: FieldError | undefined;
};

export type IsSubmitting = UseFormReturn['formState']['isSubmitting'];
