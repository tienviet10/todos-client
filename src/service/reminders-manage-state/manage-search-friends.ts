import { Dispatch, SetStateAction, useState } from "react";
import { friendsLink } from "../../shared/service-link/url-link";
import { SendFriendType } from "../../shared/types/MutationFuncType";
import { EmailUserPicId } from "../../shared/types/RESTResponse";
import { useRestSearchFriends } from "../reminders-manage-request/search-friend-requests";

export function useManageSearchFriendsState(): {
  error: string;
  searchUser: string;
  setSearchUser: Dispatch<SetStateAction<string>>;
  searchedFriendsList: EmailUserPicId[];
  sendFriendRequest: SendFriendType;
  searchNewFriend: () => void;
} {
  const [searchUser, setSearchUser] = useState<string>("");

  const {
    error,
    searchedFriendsList,
    sendFriendRequest,
    sendSearchFriendsRequest,
  } = useRestSearchFriends();

  const searchNewFriend = () => {
    searchUser &&
      searchUser !== "" &&
      sendSearchFriendsRequest({
        data: { searchUser },
        url: friendsLink(),
      });
  };

  return {
    error,
    searchUser,
    setSearchUser,
    searchedFriendsList,
    sendFriendRequest,
    searchNewFriend,
  };
}
