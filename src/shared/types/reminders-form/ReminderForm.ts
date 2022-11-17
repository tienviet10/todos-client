import { Dispatch, SetStateAction } from "react";
import { EmailUserPicId } from "../service/User";

export interface AddCollaboratorsType {
    handleDeleteTagOnCurrentUsers: (removedIndex: number) => void;
    handleDeleteTagOnPendingUsers: (removedIndex: number) => void;
    searchUser: string;
    setSearchUser: Dispatch<SetStateAction<string>>;
    loadingUserBackend: boolean;
    filteredData: EmailUserPicId[];
    handleSelectUserFromSuggestion: (value: EmailUserPicId) => void;
    users: EmailUserPicId[];
    _id: string | undefined;
    pendingRequest: EmailUserPicId[];
    text: string;
}

export interface ButtonChoicesReminderFormType {
    exitTheForm: () => void;
    saveOrAddReminder: () => void;
    _id: string | undefined;
}

export interface ChooseDateFieldType {
    setReminderDate: (remindedAt: Date) => void;
    remindedAt: any;
    text: string;
}

export interface LiSelectedUsersComponentType {
    indexToDelete: number;
    username: string;
    handleDeleteTags: (removedIndex: number) => void;
    color: string;
}

export interface RepeatFieldType {
    repeat: string;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    text: string;
}

export interface TitleDescriptionFieldsType {
    title: string;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    description: string;
    _id: string | undefined;
    textTitle: string;
    textDes: string;
}

export interface ReminderFormType { selectedTab: string }



