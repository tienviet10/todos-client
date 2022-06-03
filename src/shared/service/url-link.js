import { API } from "../constant/config";

export const postLogIn = () => {
  return `${API}/v1/login`;
};

export const postRegister = () => {
  return `${API}/v1/register`;
};

export const getAllNotificationLink = () => {
  return `${API}/v1/notifications`;
};

export const getANotificationLink = (notificationID) => {
  return `${API}/v1/notification/${notificationID}`;
};

export const getAReminderLink = (reminderID) => {
  return `/v1/reminder/${reminderID}`;
};

export const getSevenRemindersSummary = () => {
  return `/v1/reminders/seven-days-reminders`;
};
