import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseFriends() {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: acceptOrDeclinedFriendRequest } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      queryClient.invalidateQueries("notifications");
    },
    (err) => {
      setError(err);
    }
  );

  return {
    error,
    acceptOrDeclinedFriendRequest,
  };
}
