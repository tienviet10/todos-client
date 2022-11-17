import { Reminder, SharedReminder } from "./Reminder";

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
