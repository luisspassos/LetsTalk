import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { MockableFunction, MockedFunction } from 'jest-mock';
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

export type ContactsResponse = UserRecord[];

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

export type ExcludeFromTuple<T extends readonly any[], E> = T extends [
  infer F,
  ...infer R
]
  ? [F] extends [E]
    ? ExcludeFromTuple<R, E>
    : [F, ...ExcludeFromTuple<R, E>]
  : [];

export type Component = () => JSX.Element;

export type MockedFunc = MockedFunction<MockableFunction>;

//

type UndefIndex<T extends any[], I extends number> = {
  [P in keyof T]: P extends Exclude<keyof T, keyof any[]>
    ? P extends `${I}`
      ? undefined
      : T[P]
    : T[P];
};

type FilterUndefined<T extends any[]> = T extends []
  ? []
  : T extends [infer H, ...infer R]
  ? H extends undefined
    ? FilterUndefined<R>
    : [H, ...FilterUndefined<R>]
  : T;

export type SpliceTuple<T extends any[], I extends number> = FilterUndefined<
  UndefIndex<T, I>
>;
