import { Reminder, SharedReminder } from "./Reminder";
import { UserData } from "./User";

export interface NotificationData {
  createdAt: string;
  postedBy: {
    username: string;
    email: string;
    picture: string;
  };
  remindedAt: any;
  reminderID: string;
  reminderTypes: string;
  seen: boolean;
  sharedWith: {
    picture: string;
    username: string;
  }[];
  title: string;
  _id: string;
}

export interface UserEmailUsernamePicture {
  email: string;
  username: string;
  picture?: string;
}

export interface SevenDaysSummaryDataType {
  color: string;
  createdAt: string;
  description: string;
  remindedAt: any;
  status: string;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface UserFriendsList {
  acceptedFriends: UserEmailUsernamePicture[];
  pendingFriendsRequest: UserEmailUsernamePicture[];
  sentFriendRequests: UserEmailUsernamePicture[];
}

interface GeneralResponseTemplate {
  status: number;
  statusText: string;
  request: {
    status: number;
  };
  message?: string;
}

export interface EmailUserPicId {
  email: string;
  username: string;
  picture?: string;
  _id: string;
}

export interface FriendRequest extends GeneralResponseTemplate {
  data: { message: string } | EmailUserPicId[];
}

export interface GetListRemindersResponse extends GeneralResponseTemplate {
  data: Reminder[];
}

export interface GetListSharedRemindersResponse
  extends GeneralResponseTemplate {
  data: SharedReminder[];
}
export interface GetReminderResponse extends GeneralResponseTemplate {
  data: Reminder;
}
export interface GetSharedReminderResponse extends GeneralResponseTemplate {
  data: SharedReminder;
}
export interface GetNotificationsResponse extends GeneralResponseTemplate {
  data: NotificationData[];
}
export interface GetListFriendsResponse extends GeneralResponseTemplate {
  data: UserFriendsList;
}
export interface GetUserDataResponse extends GeneralResponseTemplate {
  data: UserData;
}
export interface SevenDaySummaryDataResponse extends GeneralResponseTemplate {
  data: SevenDaysSummaryDataType[];
}

export interface JSONStringResponse extends GeneralResponseTemplate {
  data: { message: string };
}

export interface ErrorHandling {
  error: string;
}

type NewDataTemplate = {
  url: string;
  from?: string;
};

export interface SearchFriend extends NewDataTemplate {
  // data: { searchTerm: string };
  data: { searchUser: string };
}

export interface SendFriend extends NewDataTemplate {
  data: { email: string };
}
export interface AcceptDeclineSharedReminder extends NewDataTemplate {
  data: {
    acceptOrDeclineFriend: string;
    status: string;
    seen: boolean;
  };
}

export interface UpdateSeen extends NewDataTemplate {
  // data: {
  //   data: { seen: boolean };
  //   url: string;
  // };

  data: { seen: boolean };
  url: string;
}

export interface NewReminderData extends NewDataTemplate {
  data?: Reminder;
}

export interface NewSharedReminderData extends NewDataTemplate {
  data?: SharedReminder;
}

export interface NewDataAPI extends NewDataTemplate {
  method: "get" | "post" | "put" | "delete";
  data?: any;
}
