import { EmailUserPicId } from "./User";


export interface Reminder {
  title: string;
  description: string;
  status: string;
  favorite: boolean;
  _id?: string;
  remindedAt: any;
  repeat: string;
  googleCalendarReminderID: string;
  location: string;
  color?: string;
  createdAt?: string;
  // :
  // Wed Nov 09 2022 17:00:00 GMT-0500 (Eastern Standard Time) {}
  updatedAt?: string;
}

export interface SharedReminder {
  title: string;
  description: string;
  status: string;
  _id?: string;
  remindedAt: any;
  repeat: string;
  googleCalendarReminderID: string[];
  location: string;
  color?: string;
  groupUsers: {
    admin: EmailUserPicId[];
    editor: EmailUserPicId[];
    viewer: EmailUserPicId[];
  };
  users: string[];
  pendingRequest: EmailUserPicId[];
  newUsersAddedToPending?: {
    add: string[];
    remove: string[];
  };
  createdAt?: string;
  // For sending to backend only
  pendingRequestTemp?: string[];
}

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