export const API = process.env.REACT_APP_API_LINK;
export const DOMAIN = "https://remeapp.netlify.app";
export const MAIN_PAGE_EXAMPLE = [
  {
    _id: "1",
    title: "Shopping List",
    description: "Apple, Banana, Grapes, Burger",
    days: "2 days ago",
    status: "active",
  },
  {
    _id: "2",
    title: "Homework",
    description: "Math, English, Chem",
    days: "5 days ago",
    status: "inactive",
  },
];
export const REMINDER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};
export const COLOR_LIST = {
  blue: "#93c5fd",
  red: "#fca5a5",
  orange: "#fdba74",
  yellow: "#fde047",
  lime: "#bef264",
  purple: "#d8b4fe",
  pink: "#f9a8d4",
  white: "#e2e8f0",
};
export const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
export const SCOPES =
  "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile";
export const CREATE_EMPTY_REMINDER = {
  title: "",
  description: "",
  status: REMINDER_STATUS.ACTIVE,
  favorite: false,
  _id: "",
  remindedAt: null,
  repeat: "none",
  googleCalendarReminderID: "",
  location: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
export const CREATE_EMPTY_SHARED_REMINDER = {
  title: "",
  description: "",
  status: REMINDER_STATUS.ACTIVE,
  _id: "",
  remindedAt: null,
  repeat: "none",
  googleCalendarReminderID: [],
  location: Intl.DateTimeFormat().resolvedOptions().timeZone,
  groupUsers: { admin: [], editor: [], viewer: [] },
  users: [],
  pendingRequest: [],
};
export const NAV_TABS = [
  { name: "reminder", href: "/personal-reminders", displayName: "Reminder" },
  { name: "share", href: "/shared-reminders", displayName: "Share" },
  { name: "profile", href: "/profile", displayName: "Profile" },
  { name: "setting", href: "/setting", displayName: "Setting" },
  { name: "friends", href: "/friends", displayName: "Friends" },
  { name: "registration", href: "/registration", displayName: "Registration" },
  { name: "login", href: "/login", displayName: "Login" },
];
