import { useState } from "react";
import { useRQPostARecord, useRQUpdateARecord } from "./rest-request";

export function useRestSearchFriends() {
  const [searchedFriendsList, setSearchedFriendsList] = useState([]);
  //const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const { mutate: sendSearchFriendsRequest } = useRQPostARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      setSearchedFriendsList(data.data);
    },
    (err) => {
      setError(err);
    }
  );

  const { mutate: sendFriendRequest } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (err) => {
      setError(err);
    }
  );

  return {
    error,
    searchedFriendsList,
    sendFriendRequest,
    sendSearchFriendsRequest,
  };
}
