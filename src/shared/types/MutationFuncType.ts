import { MutateOptions, UseMutateFunction } from "react-query";
import {
  AcceptDeclineSharedReminder,
  ErrorHandling,
  FriendRequest,
  JSONStringResponse,
  NewReminderData,
  NewSharedReminderData,
  SearchFriend,
  SendFriend,
  UpdateSeen,
} from "./RESTResponse";

export type SearchFriendType = UseMutateFunction<
  FriendRequest | undefined,
  ErrorHandling | undefined,
  SearchFriend,
  void
>;

export type SendFriendType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  SendFriend,
  void
>;

export type AcceptDeclineSharedReminderType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  AcceptDeclineSharedReminder,
  void
>;

export type UpdateSeenType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  UpdateSeen,
  void
>;

export type DiscardRecordType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  string,
  unknown
>;

export type AddReminderType = UseMutateFunction<
  FriendRequest | undefined,
  ErrorHandling | undefined,
  NewReminderData,
  void
>;

export type UpdateReminderType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  NewReminderData,
  void
>;

export type AddSharedType = UseMutateFunction<
  FriendRequest | undefined,
  ErrorHandling | undefined,
  NewSharedReminderData,
  void
>;

export type UpdateSharedType = UseMutateFunction<
  JSONStringResponse | undefined,
  ErrorHandling | undefined,
  NewSharedReminderData,
  void
>;

export type PasswordConfirmationType =
  | MutateOptions<
      JSONStringResponse | undefined,
      ErrorHandling | undefined,
      any,
      void
    >
  | undefined;
