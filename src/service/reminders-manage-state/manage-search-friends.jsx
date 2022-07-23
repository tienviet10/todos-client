import { useState } from "react";
import { friendsLink } from "../../shared/service-link/url-link";
import { useRestSearchFriends } from "../reminders-manage-request/search-friend-requests";

export function useManageSearchFriendsState() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    error,
    searchedFriendsList,
    sendFriendRequest,
    sendSearchFriendsRequest,
  } = useRestSearchFriends();

  const searchNewFriend = () => {
    searchTerm &&
      searchTerm !== "" &&
      sendSearchFriendsRequest({
        data: { searchTerm },
        url: friendsLink(),
      });
  };

  return {
    error,
    searchTerm,
    setSearchTerm,
    searchedFriendsList,
    sendFriendRequest,
    searchNewFriend,
  };
}
