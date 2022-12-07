import { createContext, useState } from "react";
import { ResponseFriendsContextType } from "../../shared/types/service/ContextType";
import { useRestFriendList } from "../reminders-manage-request/friends-list";

const ResponseFriendsContext = createContext<ResponseFriendsContextType>(
  {} as ResponseFriendsContextType
);

function ResponseFriendsProvider({ children }: { children: React.ReactNode }) {
  const [openTab, setOpenTab] = useState<number>(0);

  const { listFriends, loading, error, refetchFriendList } =
    useRestFriendList();

  // const changeTab =
  //   (tabIndex: number) => (e: React.FormEvent<HTMLFormElement>) => {
  //     refetchFriendList();
  //     e.preventDefault();
  //     setOpenTab(tabIndex);
  //   };

    const changeTab =
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, tabIndex: number) => {
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
