import { useState } from "react";
import { friendsLink } from "../../shared/service-link/url-link";
import { UseManageSearchFriendsStateType } from "../../shared/types/service/ManageStateType";
import { useRestSearchFriends } from "../reminders-manage-request/search-friend-requests";

export function useManageSearchFriendsState(): UseManageSearchFriendsStateType {
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
