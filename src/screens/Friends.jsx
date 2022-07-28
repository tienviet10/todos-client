import { useContext, useEffect } from "react";
import withUser from "../service/auth/withUser";
import { ResponseFriendsContext } from "../service/context/ResponseFriendsContext";
import { CurrentFriends } from "./components/friends/current-friends/CurrentFriends";
import { ResponseFriendsRequestMainPage } from "./components/friends/response-friends-request/ResponseFriendsRequestMainPage";
import { SearchFriendsMainPage } from "./components/friends/search-friends/SearchFriendsMainPage";
import { TabsComponent } from "./components/friends/TabsComponent";

const Friends = ({ user }) => {
  const { listFriends, openTab, changeTab, refetchFriendList } = useContext(
    ResponseFriendsContext
  );

  useEffect(() => {
    refetchFriendList();
  }, [refetchFriendList]);

  return (
    <div className="flex max-w-[1240px] w-full mx-auto sm:pt-6 font-bold mb-2">
      <div className="w-full justify-center items-center overflow-hidden md:max-w-md mx-auto sm:my-14 px-2">
        <ul
          className="flex flex-row mb-0 list-none flex-wrap py-4"
          role="tablist"
        >
          {["Search", "Request", "Friends"].map((tabName, index) => (
            <TabsComponent
              key={tabName}
              openTab={openTab}
              changeTab={changeTab}
              tabNumber={index}
              tabName={tabName}
            />
          ))}
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded">
          <div className="tab-content tab-space">
            <div className={openTab === 0 ? "block" : "hidden"} id="link0">
              <SearchFriendsMainPage user={user} />
            </div>
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              {listFriends && (
                <ResponseFriendsRequestMainPage
                  pendingFriendsRequest={listFriends.pendingFriendsRequest}
                  sentFriendRequest={listFriends.sentFriendRequests}
                />
              )}
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              {listFriends && listFriends.acceptedFriends && (
                <CurrentFriends acceptedFriends={listFriends.acceptedFriends} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUser(Friends);
