import { UseFormRegister } from 'react-hook-form';
import {
  FieldError,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form/dist/types';

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

export type Errors<T extends FieldValues> =
  UseFormReturn<T>['formState']['errors'];

export type InputsProps<T extends FieldValues> = {
  register: InputProps['register'];
  errors: Errors<T>;
};
