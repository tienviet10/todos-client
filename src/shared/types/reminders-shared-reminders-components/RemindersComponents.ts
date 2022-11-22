import { Reminder, SharedReminder } from "../service/Reminder";
import { EmailUserPicId, UserDataType } from "../service/User";

export interface RemindersListType {
    title: string;
    remindersList: Reminder[];
    moveReminderToPast: (item: Reminder) => void;
    saveNewChosenColor: (color: string, item: Reminder) => void;
    handleDetailsScreen: (item: Reminder) => void;
    editFavorite: (item: Reminder, fav: boolean) => void;
    editReminder: (item: Reminder) => void;
    execDeletion: (itemId: string) => void;
}

export interface SharedRemindersListType extends UserDataType {
    title: string;
    remindersList: SharedReminder[];
    moveReminderToPast: (item: SharedReminder) => void;
    saveNewChosenColor: (color: string, item: SharedReminder) => void;
    handleDetailsScreen: (item: SharedReminder) => void;
    editReminder: (item: SharedReminder) => void;
    execDeletion: (itemId: string) => void;
}

export interface UserIconOnReminderType {
    user: EmailUserPicId;
    color: string;
}

export interface DetailOfAReminderWindowType {
    selectedTab: string;
}

