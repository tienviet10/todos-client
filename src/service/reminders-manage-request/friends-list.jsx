import { useState } from "react";
import { friendsLink } from "../../shared/service-link/url-link";
import { useRQGetRecords } from "./rest-request";

export function useRestFriendList() {
  const [listFriends, setListFriends] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const { refetch: refetchFriendList } = useRQGetRecords(
    "userFriends",
    friendsLink(),
    false,
    (data) => {
      setIsLoading(true);

      if (
        data.response !== undefined &&
        (data.response.status === 404 || data.response.status === 401)
      ) {
        setError(true);
      }

      if (data.data !== undefined) {
        setListFriends(data.data);
      }
      setIsLoading(false);
    },
    () => setError(true)
  );

  return {
    listFriends,
    loading,
    error,
    refetchFriendList,
  };
}
