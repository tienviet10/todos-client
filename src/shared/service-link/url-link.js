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

export const sharedRemindersGeneralLink = () => {
  return "/v1/shared-reminder";
};

export const sharedReminderWithIDLink = (reminderID) => {
  return `/v1/shared-reminder/${reminderID}`;
};

export const updateMultipleRemindersLink = () => {
  return "/v1/reminders";
};

export const getActiveRemindersLink = () => {
  return "/v1/reminders/active";
};

export const pastRemindersLink = () => {
  return "/v1/reminders/past";
};

export const getSevenRemindersSummaryLink = () => {
  return "/v1/reminders/seven-days-reminders";
};

export const getActiveSharedRemindersLink = () => {
  return "/v1/shared-reminders/active";
};

export const updateMultipleSharedRemindersLink = () => {
  return "/v1/shared-reminders";
};

export const pastSharedRemindersLink = () => {
  return "/v1/shared-reminders/past";
};

export const createGoogleTokensLink = () => {
  return "/v1/google-tokens";
};

export const deleteGoogleRefreshAccessLink = (_id) => {
  return `/v1/google-tokens/${_id}`;
};

// export const passwordConfirmationLink = () => {
//   return "/v1/password-confirmation";
// };

export const updateUserProfileLink = () => {
  return "/v1/user-info";
};

export const friendsLink = () => {
  return "/v1/friends";
};

export const acceptFriendsLink = () => {
  return "/v1/accepted-friends";
};

export const declineFriendsLink = () => {
  return "/v1/declined-friends";
};

export const pendingFriendsLink = () => {
  return "/v1/pending-friends";
};

export const getSuggestedCollaboratorsLink = () => {
  return "/v1/suggested-friends";
};

export const acceptJoinedSharedReminderLink = (notificationID) => {
  return `/v1/join-shared-reminders/${notificationID}`;
};

export const declineJoinedSharedReminderLink = (notificationID) => {
  return `/v1/decline-shared-reminders/${notificationID}`;
};
