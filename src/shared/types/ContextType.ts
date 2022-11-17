import { Dispatch, SetStateAction } from "react";
import { ConfirmationType, DescriptionTextType } from "./ConfimationType";
import {
  AddReminderType,
  AddSharedType,
  DiscardRecordType,
  UpdateReminderType,
  UpdateSharedType,
} from "./MutationFuncType";
import { Reminder, SharedReminder } from "./Reminder";
import { SevenDaysSummaryDataType, UserFriendsList } from "./RESTResponse";
import { UserNewPassword } from "./User";

export interface ReminderContextType {
  allReminders: Reminder[];
  error: string;
  loading: boolean;
  discardRecord: DiscardRecordType;
  addRecord: AddReminderType;
  updateRecord: UpdateReminderType;
}

export interface RestOperationSharedReminder {
  allSharedReminders: SharedReminder[];
  error: string;
  loading: boolean;
  discardSharedRecord: DiscardRecordType;
  addSharedRecord: AddSharedType;
  updateSharedRecord: UpdateSharedType;
}

export interface DetailOfAReminderContextType {
  detailOn: boolean;
  setDetailOn: Dispatch<SetStateAction<boolean>>;
  reminderDetails: Reminder;
  setReminderDetails: Dispatch<SetStateAction<Reminder>>;
  setSharedReminderDetails: Dispatch<SetStateAction<SharedReminder>>;
  sharedReminderDetails: SharedReminder;
}

export interface RestPastReminderType {
  pastReminders: Reminder[] | null;
  error: string;
  loading: boolean;
  discardRecord: DiscardRecordType;
  setIsPastRemindersOn: Dispatch<SetStateAction<boolean>>;
  isPastRemindersOn: boolean;
}

export interface RestPastSharedReminderType {
  pastSharedReminders: SharedReminder[] | null;
  error: string;
  loading: boolean;
  discardRecord: DiscardRecordType;
  setIsPastSharedRemindersOn: Dispatch<SetStateAction<boolean>>;
  isPastSharedRemindersOn: boolean;
}

export interface SevenDaysSummaryContextType {
  isSummaryOn: boolean;
  setIsSummaryOn: Dispatch<SetStateAction<boolean>>;
  sevenDaysReminders: SevenDaysSummaryDataType[];
  error: string;
  refetchSevenDaysSummary: () => void;
}

export interface ResponseFriendsContextType {
  listFriends: UserFriendsList | null;
  loading: boolean;
  error: string;
  openTab: number;
  setOpenTab: Dispatch<SetStateAction<number>>;
  changeTab: (tabIndex: number) => void;
  refetchFriendList: () => void;
}

export interface ReminderModalContextType {
  modalOn: boolean;
  setModalOn: (toggleStatus: boolean) => void;
  newReminder: Reminder;
  setNewReminder: Dispatch<SetStateAction<Reminder>>;
  newSharedReminder: SharedReminder;
  setNewSharedReminder: Dispatch<SetStateAction<SharedReminder>>;
  selectedNavTab: string;
  setNavTab: Dispatch<SetStateAction<string>>;
}

export interface PasswordConfirmationProfileContextType {
  passConfirmationProfileToggle: boolean;
  setPassConfirmationProfileToggle: Dispatch<SetStateAction<boolean>>;
  confirmationRequest: (password: string) => void;
  setNewPasswordUpdate: Dispatch<SetStateAction<UserNewPassword>>;
  newPasswordUpdate: UserNewPassword;
}

export interface ConfirmationContextType {
  confirmationOn: boolean;
  confirmationFunction: () => void;
  confirm: ConfirmationType;
  descriptionText: DescriptionTextType;
  setConfirmationOn: Dispatch<SetStateAction<boolean>>;
}

export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

export interface PasswordConfirmationProfileContextType {
  passConfirmationProfileToggle: boolean;
  setPassConfirmationProfileToggle: Dispatch<SetStateAction<boolean>>;
  confirmationRequest: (password: string) => void;
  setNewPasswordUpdate: Dispatch<SetStateAction<UserNewPassword>>;
  newPasswordUpdate: UserNewPassword;
}
