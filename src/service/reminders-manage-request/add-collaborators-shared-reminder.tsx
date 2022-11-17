import { Dispatch, SetStateAction, useState } from "react";
import { SearchFriendType } from "../../shared/types/MutationFuncType";
import { EmailUserPicId } from "../../shared/types/RESTResponse";
import { useRQPostARecord } from "./rest-request";

export function useRestAddCollaboratorsOnReminder(): {
  error: string;
  filteredData: EmailUserPicId[];
  setFilteredData: Dispatch<SetStateAction<EmailUserPicId[]>>;
  getSearchedCollaborators: SearchFriendType;
  loadingUserBackend: boolean;
  setLoadingUserBackend: Dispatch<SetStateAction<boolean>>;
} {
  const [filteredData, setFilteredData] = useState<EmailUserPicId[]>([]);
  const [error, setError] = useState<string>("");
  const [loadingUserBackend, setLoadingUserBackend] = useState<boolean>(false);

  //Add a record to mongodb then to google calendar
  const { mutate: getSearchedCollaborators } = useRQPostARecord(
    (data) => {
      (data?.request?.status === 404 || data?.request?.status === 400) &&
        setError(data?.message as string);
      if (data?.data !== undefined) {
        setFilteredData(data?.data as EmailUserPicId[]);
      }
      setLoadingUserBackend(false);
    },
    (err) => {
      setError(err?.error as string);
      setLoadingUserBackend(false);
    },
    () => {},
    () => {}
  );

  return {
    error,
    filteredData,
    setFilteredData,
    getSearchedCollaborators,
    loadingUserBackend,
    setLoadingUserBackend,
  };
}
