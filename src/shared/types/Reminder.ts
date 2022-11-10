export interface Reminder {
  title: string;
  description: string;
  status: string;
  favorite: boolean;
  _id: string;
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
  _id: string;
  remindedAt: any;
  repeat: string;
  googleCalendarReminderID: string[];
  location: string;
  groupUsers: {
    admin: string[];
    editor: string[];
    viewer: string[];
  };
  users: string[];
  pendingRequest: string[];
}
