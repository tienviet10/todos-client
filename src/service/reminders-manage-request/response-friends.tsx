import { useState } from "react";
import { useQueryClient } from "react-query";
import { SendFriendType } from "../../shared/types/MutationFuncType";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseFriends(): {
  error: string;
  acceptOrDeclinedFriendRequest: SendFriendType;
} {
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
