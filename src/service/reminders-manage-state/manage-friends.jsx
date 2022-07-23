import { useState } from "react";
import { useRestFriendList } from "../reminders-manage-request/friends-list";

export function useManageFriendsState() {
  const [openTab, setOpenTab] = useState(0);

  const { listFriends, loading, error } = useRestFriendList();

  const changeTab = (tabIndex) => (e) => {
    e.preventDefault();
    setOpenTab(tabIndex);
  };

  return {
    listFriends,
    loading,
    error,
    openTab,
    setOpenTab,
    changeTab,
  };
}
