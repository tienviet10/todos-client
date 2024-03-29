import { useManageSearchFriendsState } from "../../../../service/reminders-manage-state/manage-search-friends";
import { UserDataType } from "../../../../shared/types/service/User";
import { FriendsSuggestionList } from "./FriendsSuggestionList";
import { SearchFriends } from "./SearchFriends";

export const SearchFriendsMainPage:React.FC<UserDataType> = ({ user }) => {
  const {
    searchUser,
    setSearchUser,
    searchedFriendsList,
    sendFriendRequest,
    searchNewFriend,
  } = useManageSearchFriendsState();
  return (
    <div className="flex-auto px-4 py-4 shadow-lg rounded-md">
      <SearchFriends
        searchUser={searchUser}
        setSearchUser={setSearchUser}
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
