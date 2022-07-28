import { createContext, useState } from "react";
import { useRestFriendList } from "../reminders-manage-request/friends-list";

const ResponseFriendsContext = createContext();

function ResponseFriendsProvider({ children }) {
  const [openTab, setOpenTab] = useState(0);

  const { listFriends, loading, error, refetchFriendList } =
    useRestFriendList();

  const changeTab = (tabIndex) => (e) => {
    refetchFriendList();
    e.preventDefault();
    setOpenTab(tabIndex);
  };

  return (
    <ResponseFriendsContext.Provider
      value={{
        listFriends,
        loading,
        error,
        openTab,
        setOpenTab,
        changeTab,
        refetchFriendList,
      }}
    >
      {children}
    </ResponseFriendsContext.Provider>
  );
}

export { ResponseFriendsContext, ResponseFriendsProvider };
