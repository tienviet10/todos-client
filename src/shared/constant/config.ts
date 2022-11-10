import { Reminder, SharedReminder } from "../types/Reminder";
import { EachTab } from "../types/Tab";

type HomeScreenReminder = {
  _id: string;
  title: string;
  description: string;
  days: string;
  status: string;
};

type ReminderStatus = {
  ACTIVE: string;
  INACTIVE: string;
};

type ChosenColorReminder = {
  blue: string;
  red: string;
  orange: string;
  yellow: string;
  lime: string;
  purple: string;
  pink: string;
  white: string;
};

type EachLanguage = {
  code: string;
  name: string;
  country_code: string;
};

export const API: string | undefined = process.env.REACT_APP_API_LINK;

export const MAIN_PAGE_EXAMPLE: HomeScreenReminder[] = [
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

export const REMINDER_STATUS: ReminderStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const COLOR_LIST: ChosenColorReminder = {
  blue: "#93c5fd",
  red: "#fca5a5",
  orange: "#fdba74",
  yellow: "#fde047",
  lime: "#bef264",
  purple: "#d8b4fe",
  pink: "#f9a8d4",
  white: "#e2e8f0",
};

export const DISCOVERY_DOC: string =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

export const SCOPES: string =
  "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile";

export const CREATE_EMPTY_REMINDER: Reminder = {
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

export const CREATE_EMPTY_SHARED_REMINDER: SharedReminder = {
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

export const NAV_TABS: EachTab[] = [
  { name: "reminder", href: "/personal-reminders", displayName: "Reminder" },
  { name: "share", href: "/shared-reminders", displayName: "Share" },
  { name: "profile", href: "/profile", displayName: "Profile" },
  { name: "setting", href: "/setting", displayName: "Setting" },
  { name: "friends", href: "/friends", displayName: "Friends" },
  { name: "registration", href: "/registration", displayName: "Registration" },
  { name: "login", href: "/login", displayName: "Login" },
  { name: "privacy", href: "/privacy", displayName: "PrivacyPolicy" },
];

export const languages: EachLanguage[] = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "vi",
    name: "Vietnamese",
    country_code: "vn",
  },
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
];
