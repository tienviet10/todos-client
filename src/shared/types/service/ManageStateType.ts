import { TFunction } from "i18next";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { EachLanguage } from "../../constant/config";
import { SendFriendType } from "./MutationFuncType";
import { NotificationData, Reminder, SharedReminder } from "./Reminder";
import { EmailUserPicId, GreetingImageType, UserInfoRegistration } from "./User";

export interface ManageAddReminderFormStateType {
  newReminder: Reminder;
  exitTheForm: () => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  favorite: boolean;
  handleFavoriteChange: () => void;
  setReminderDate: (remindedAt: Date) => void;
  saveOrAddReminder: () => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageSharedPastRemindersStateType {
  loading: boolean;
  error: string;
  pastSharedReminders: SharedReminder[] | null;
  restorePastReminder: (item: SharedReminder) => void;
  handleDetailsScreen: (item: SharedReminder) => void;
  execDeletion: (itemId: string) => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageRegistrationStateType extends UserInfoRegistration {
  loading: boolean;
  register: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  navigate: NavigateFunction;
  t: TFunction<"translation", undefined>;
}

export interface ManagePastRemindersStateType {
  pastReminders: Reminder[] | null;
  error: string;
  loading: boolean;
  restorePastReminder: (item: Reminder) => void;
  handleDetailsScreen: (item: Reminder) => void;
  execDeletion: (itemId: string) => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageSharedRemindersStateType {
  allSharedReminders: SharedReminder[];
  loadingSharedReminders: boolean;
  errorGetSharedReminders: string;
  handleDetailsScreen: (item: SharedReminder) => void;
  execDeletion: (itemId: string) => void;
  moveReminderToPast: (item: SharedReminder) => void;
  editReminder: (item: SharedReminder) => void;
  saveNewChosenColor: (color: string, item: SharedReminder) => void;
  sayHi: GreetingImageType;
  t: TFunction<"translation", undefined>;
}

export interface ManageRemindersStateType {
  allReminders: Reminder[];
  loadingReminders: boolean;
  errorGetReminders: string;
  editFavorite: (item: Reminder, fav: boolean) => void;
  handleDetailsScreen: (item: Reminder) => void;
  execDeletion: (itemId: string) => void;
  moveReminderToPast: (item: Reminder) => void;
  editReminder: (item: Reminder) => void;
  saveNewChosenColor: (color: string, item: Reminder) => void;
  sayHi: GreetingImageType;
  t: TFunction<"translation", undefined>;
}

export interface ManageDisplayDetailRemindersStateType {
  setDetailOn: Dispatch<SetStateAction<boolean>>;
  reminderDetails: Reminder;
  moveReminderToPast: (details: Reminder) => void;
  restoreReminder: (details: Reminder) => void;
  execDeletion: (details: Reminder) => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageDisplayDetailSharedRemindersStateType {
  setDetailOn: Dispatch<SetStateAction<boolean>>;
  sharedReminderDetails: SharedReminder;
  moveReminderToPast: (details: SharedReminder) => void;
  restoreReminder: (details: SharedReminder) => void;
  execDeletion: (details: SharedReminder) => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageNavbarStateType {
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
  changeTabsWithoutNavigation: (name: string) => void;
  changeTabsAndNavigation: (name: string, href: string) => void;
  toggleAddReminder: () => void;
  dropdownOpen: boolean;
  logout: () => void;
  navigate: NavigateFunction;
  expandLanguages: boolean;
  setExpandLanguages: Dispatch<SetStateAction<boolean>>;
  languages: EachLanguage[];
  t: TFunction<"translation", undefined>;
  changeLanguages: (lang: string) => void;
}

export interface ManageBellNotificationsStateType {
  isNewNotification: boolean;
  notifications: NotificationData[];
  navigateToReminderDetail: (
    reminderID: string,
    notificationID: string
  ) => void;
  navigateToSharedReminderDetail: (
    reminderID: string,
    notificationID: string
  ) => void;
  navigateToFriends: (notificationID: string) => void;
  openSevenDaySUmmary: () => void;
  t: TFunction<"translation", undefined>;
}

export interface ManageAddSharedReminderFormStateType {
  newSharedReminder: SharedReminder;
  exitTheForm: () => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setReminderDate: (remindedAt: Date) => void;
  saveOrAddReminder: () => void;
  searchUser: string;
  handleDeleteTagOnCurrentUsers: (removedIndex: number) => void;
  handleDeleteTagOnPendingUsers: (removedIndex: number) => void;
  setSearchUser: Dispatch<SetStateAction<string>>;
  loadingUserBackend: boolean;
  filteredData: EmailUserPicId[];
  handleSelectUserFromSuggestion: (value: EmailUserPicId) => void;
  t: TFunction<"translation", undefined>;
}

export interface SseManageProfileStateType {
  username: string;
  newPassword: string;
  newPasswordConfirmation: string;
  handleAuthClick: () => void;
  handleGoogleLogout: (userID: any) => void;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSummit: () => void;
  t: TFunction<"translation", undefined>;
}

export interface UseManageResponseFriendStateType {
  toggleOnOff: string;
  setToggleOnOff: Dispatch<SetStateAction<string>>;
  acceptAFriend: (email: string) => void;
  declineAFriend: (email: string) => void;
  t: TFunction<"translation", undefined>;
}

export interface UseManageResponseSharedReminderStateType {
  toggleOnOff: string;
  setToggleOnOff: Dispatch<SetStateAction<string>>;
  acceptASharedReminder: (_id: string) => void;
  declineASharedReminder: (_id: string) => void;
}

export interface UseManageSearchFriendsStateType {
  error: string;
  searchUser: string;
  setSearchUser: Dispatch<SetStateAction<string>>;
  searchedFriendsList: EmailUserPicId[];
  sendFriendRequest: SendFriendType;
  searchNewFriend: () => void;
}
