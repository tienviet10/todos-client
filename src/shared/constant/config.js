export const API = "http://localhost:8000/api";
export const DOMAIN = "http://localhost:3000";
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
    status: "deactive",
  },
];
export const REMINDER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "deactive",
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
export const SCOPES = "https://www.googleapis.com/auth/calendar.events";
