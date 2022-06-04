import { API } from "../constant/config";

export const postLogInLink = () => {
  return `${API}/v1/login`;
};

export const postRegisterLink = () => {
  return `${API}/v1/register`;
};

export const getUserAuthenticationLink = () => {
  return "/v1/user-auth";
};

export const getAllNotificationLink = () => {
  return "/v1/notifications";
};

export const getANotificationLink = (notificationID) => {
  return `/v1/notification/${notificationID}`;
};

export const remindersGeneralLink = () => {
  return "/v1/reminder";
};

export const reminderWithIDLink = (reminderID) => {
  return `/v1/reminder/${reminderID}`;
};

export const getSevenRemindersSummaryLink = () => {
  return "/v1/reminders/seven-days-reminders";
};

export const getActiveRemindersLink = () => {
  return "/v1/reminders/active";
};

export const pastRemindersLink = () => {
  return "/v1/reminders/past";
};
