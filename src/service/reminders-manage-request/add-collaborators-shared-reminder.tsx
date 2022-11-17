import { useState } from "react";
import { UseRestAddCollaboratorsOnReminderType } from "../../shared/types/service/ManageRequest";
import { EmailUserPicId } from "../../shared/types/service/User";

import { useRQPostARecord } from "./rest-request";

export function useRestAddCollaboratorsOnReminder(): UseRestAddCollaboratorsOnReminderType {
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
