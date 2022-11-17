import { useState } from "react";
import { UseRestSearchFriendsType } from "../../shared/types/service/ManageRequest";
import { EmailUserPicId } from "../../shared/types/service/User";

import { useRQPostARecord, useRQUpdateARecord } from "./rest-request";

export function useRestSearchFriends(): UseRestSearchFriendsType {
  const [searchedFriendsList, setSearchedFriendsList] = useState<
    EmailUserPicId[]
  >([]);
  const [error, setError] = useState<string>("");

  const { mutate: sendSearchFriendsRequest } = useRQPostARecord(
    (data) => {
      data?.request?.status === 404 && setError(data?.message as string);
      setSearchedFriendsList(data?.data as EmailUserPicId[]);
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
  );

  const { mutate: sendFriendRequest } = useRQUpdateARecord(
    (data) => {
      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
  );

  return {
    error,
    searchedFriendsList,
    sendFriendRequest,
    sendSearchFriendsRequest,
  };
}
