import { useState } from "react";
import { useQueryClient } from "react-query";
import { UseRestResponseFriendsType } from "../../shared/types/service/ManageRequest";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseFriends():UseRestResponseFriendsType {
  const [error, setError] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: acceptOrDeclinedFriendRequest } = useRQUpdateARecord(
    (data) => {
      data?.request?.status === 404 && setError(data?.message as string);
      queryClient.invalidateQueries("notifications");
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
  );

  return {
    error,
    acceptOrDeclinedFriendRequest,
  };
}
