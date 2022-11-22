import { Dispatch, SetStateAction } from "react";
import { NotificationData, Reminder, SharedReminder } from "../service/Reminder";

import { EachTab } from "../service/Tab";
import { UserDataType } from "../service/User";

export interface SuccessType {
    success: string
}

export interface ErrorType {
    error: string
}

export interface LabelTextType { text: string }

export interface ImageUsernameEmailCardType {
    username: string;
    picture: string;
    email: string;
    children?: JSX.Element;
}

export interface GlobeIconType {
    width?: number;
    height?: number;
    color?: string;
}

export interface DisableButtonWithColorAndTextType {
    buttonColor: string;
    buttonText: string;
}

export interface CloseButtonType {
    takeAction: () => void
}

export interface ButtonIconTextType {
    iconImage: JSX.Element;
    testDisplay: string;
    onClick: () => void;
}

export interface NavbarType extends UserDataType {
    setNavTab: Dispatch<SetStateAction<string>>;
    selectedNavTab: string;
}

export interface LinkComponentProfileIconType {
    changeTabsWithoutNavigation: (name: string) => void;
    link: string;
    displayName: string;
}

export interface LinkComponentDesktopTabsType {
    item: EachTab;
    changeTabsWithoutNavigation: (name: string) => void;
    tabName: string;
    selectedNavTab: string;
}

export interface ButtonComponentMobileTabsType {
    item: EachTab;
    changeTabsAndNavigation: (name: string, href: string) => void;
    tabName: string;
    selectedNavTab: string;
}

export interface ColorSelectionDropdownType {
    item: Reminder | SharedReminder;
    saveNewChosenColor: any;
}

export type ReturnAppropriateColorType = (itemColor: string) => string

export interface NotificationItemSharedReminderPendingType {
    notificationItem: NotificationData;
    navigateToFriends: (notificationID: string) => void;
}

export interface NotificationItemShareType {
    notificationItem: NotificationData;
    navigateToSharedReminderDetail: (
        reminderID: string,
        notificationID: string
    ) => void;
}

export interface NotificationItemPersonalType {
    notificationItem: NotificationData;
    navigateToReminderDetail: (
        reminderID: string,
        notificationID: string
    ) => void;
}

export interface NotificationItemFriendRequestType {
    notificationItem: NotificationData;
    navigateToFriends: (notificationID: string) => void;
}

export interface BellNotificationType {
    dropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    setNavTab: Dispatch<SetStateAction<string>>;
}

