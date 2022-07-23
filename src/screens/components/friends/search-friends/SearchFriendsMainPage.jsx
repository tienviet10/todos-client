import React from "react";
import { useManageSearchFriendsState } from "../../../../service/reminders-manage-state/manage-search-friends";
import { FriendsSuggestionList } from "./FriendsSuggestionList";
import { SearchFriends } from "./SearchFriends";

export const SearchFriendsMainPage = ({ user }) => {
  const {
    searchTerm,
    setSearchTerm,
    searchedFriendsList,
    sendFriendRequest,
    searchNewFriend,
  } = useManageSearchFriendsState();
  return (
    <div className="px-4 py-4 flex-auto shadow-lg rounded-md">
      <SearchFriends
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchNewFriend={searchNewFriend}
      />
      <FriendsSuggestionList
        searchedFriendsList={searchedFriendsList}
        email={user.user && user.user.email}
        sendFriendRequest={sendFriendRequest}
      />
    </div>
  );
};
