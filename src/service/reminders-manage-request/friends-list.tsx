import { useState } from "react";
import { friendsLink } from "../../shared/service-link/url-link";
import { GetListFriendsResponse, UseRestFriendListType } from "../../shared/types/service/ManageRequest";
import { UserFriendsList } from "../../shared/types/service/User";
import { useRQGetRecords } from "./rest-request";

export function useRestFriendList(): UseRestFriendListType {
  const [listFriends, setListFriends] = useState<UserFriendsList | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const { refetch: refetchFriendList } = useRQGetRecords(
    "userFriends",
    friendsLink(),
    false,
    (data: GetListFriendsResponse) => {
      setIsLoading(true);
      if (data?.request?.status === 404 || data?.request?.status === 401) {
        setError(data?.message as string);
      }

      if (data?.data !== undefined) {
        setListFriends(data?.data);
      }
      setIsLoading(false);
    },
    (err) => setError(err?.error as string)
  );

  return {
    listFriends,
    loading,
    error,
    refetchFriendList,
  };
}
