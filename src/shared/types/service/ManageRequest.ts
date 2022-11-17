import { Dispatch, SetStateAction } from "react";
import { AcceptDeclineSharedReminderType, AddReminderType, AddSharedType, DiscardRecordType, SearchFriendType, SendFriendType, UpdateReminderType, UpdateSeenType, UpdateSharedType } from "./MutationFuncType";
import { NotificationData, Reminder, SevenDaysSummaryDataType, SharedReminder } from "./Reminder";
import { EmailUserPicId, UserData, UserFriendsList } from "./User";

interface GeneralResponseTemplate {
    status: number;
    statusText: string;
    request: {
        status: number;
    };
    message?: string;
}

export interface FriendRequest extends GeneralResponseTemplate {
    data: { message: string } | EmailUserPicId[];
}
export interface GetListRemindersResponse extends GeneralResponseTemplate {
    data: Reminder[];
}
export interface GetListSharedRemindersResponse
    extends GeneralResponseTemplate {
    data: SharedReminder[];
}
export interface GetReminderResponse extends GeneralResponseTemplate {
    data: Reminder;
}
export interface GetSharedReminderResponse extends GeneralResponseTemplate {
    data: SharedReminder;
}
export interface GetNotificationsResponse extends GeneralResponseTemplate {
    data: NotificationData[];
}
export interface GetListFriendsResponse extends GeneralResponseTemplate {
    data: UserFriendsList;
}
export interface GetUserDataResponse extends GeneralResponseTemplate {
    data: UserData;
}
export interface SevenDaySummaryDataResponse extends GeneralResponseTemplate {
    data: SevenDaysSummaryDataType[];
}
export interface JSONStringResponse extends GeneralResponseTemplate {
    data: { message: string };
}

export interface ErrorHandling {
    error: string;
}


export interface UseRestAddCollaboratorsOnReminderType {
    error: string;
    filteredData: EmailUserPicId[];
    setFilteredData: Dispatch<SetStateAction<EmailUserPicId[]>>;
    getSearchedCollaborators: SearchFriendType;
    loadingUserBackend: boolean;
    setLoadingUserBackend: Dispatch<SetStateAction<boolean>>;
}

export interface UseRestFriendListType {
    listFriends: UserFriendsList | null;
    loading: boolean;
    error: string;
    refetchFriendList: () => void;
}

export interface UseNotificationType {
    notificationsList: NotificationData[];
    error: string;
    updateSeenStatusAndRefreshAReminder: UpdateSeenType;
    updateSeenStatusAndRefreshASharedReminder: UpdateSeenType;
    updateSeenStatusOnly: UpdateSeenType;
    setAReminder: Dispatch<SetStateAction<string>>;
    refetchAReminder: () => void;
    refetchASharedReminder: () => void;
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

export interface ReminderContextType {
    allReminders: Reminder[];
    error: string;
    loading: boolean;
    discardRecord: DiscardRecordType;
    addRecord: AddReminderType;
    updateRecord: UpdateReminderType;
}

export type UseRestResponseFriendsType = {
    error: string;
    acceptOrDeclinedFriendRequest: SendFriendType;
}

export type UseRestResponseSharedReminderType = {
    error: string;
    acceptOrDeclinedSharedReminderRequest: AcceptDeclineSharedReminderType;
}

export type UseRestSearchFriendsType = {
    error: string;
    searchedFriendsList: EmailUserPicId[];
    sendFriendRequest: SendFriendType;
    sendSearchFriendsRequest: SearchFriendType;
}

export interface RestOperationSharedReminder {
    allSharedReminders: SharedReminder[];
    error: string;
    loading: boolean;
    discardSharedRecord: DiscardRecordType;
    addSharedRecord: AddSharedType;
    updateSharedRecord: UpdateSharedType;
}