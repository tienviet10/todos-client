import { useState } from "react";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseFriends() {
  const [error, setError] = useState(null);

  //useRestResponseFriends

  const { mutate: acceptFriendRequest } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (err, friends, context) => {
      setError(err);
    },
    () => {},
    () => {}
  );

  return {
    error,
    acceptFriendRequest,
  };
}
