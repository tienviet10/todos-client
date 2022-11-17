import { useState } from "react";
import {
  SearchFriendType,
  SendFriendType,
} from "../../shared/types/MutationFuncType";
import { EmailUserPicId } from "../../shared/types/RESTResponse";
import { useRQPostARecord, useRQUpdateARecord } from "./rest-request";

export function useRestSearchFriends(): {
  error: string;
  searchedFriendsList: EmailUserPicId[];
  sendFriendRequest: SendFriendType;
  sendSearchFriendsRequest: SearchFriendType;
} {
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
