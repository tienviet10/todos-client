import { Dispatch, SetStateAction } from "react";
import { SendFriendType } from "../service/MutationFuncType";
import { EmailUserPicId, UserEmailUsernamePicture } from "../service/User";

export interface CurrentFriendsType {
    acceptedFriends: UserEmailUsernamePicture[];
}

export interface ResponseFriendsRequestMainPageType {
    pendingFriendsRequest: UserEmailUsernamePicture[];
    sentFriendRequest: UserEmailUsernamePicture[];
}

export interface FriendsSuggestionListType {
    searchedFriendsList: EmailUserPicId[];
    email: string;
    sendFriendRequest: SendFriendType;
}

export interface RequestedButtonType {
    sendFriendRequest: SendFriendType;
    email: string;
}

export interface SearchFriendsType {
    searchUser: string;
    setSearchUser: Dispatch<SetStateAction<string>>;
    searchNewFriend: () => void;
}

export interface TabsComponentType {
    openTab: number;
    changeTab: (e: any, tabIndex: number) => any;
    tabNumber: number;
    tabName: string;
}

