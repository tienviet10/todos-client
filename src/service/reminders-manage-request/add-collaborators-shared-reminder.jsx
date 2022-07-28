import { useState } from "react";
import { useRQPostARecord } from "./rest-request";

export function useRestAddCollaboratorsOnReminder() {
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingUserBackend, setLoadingUserBackend] = useState(false);

  //Add a record to mongodb then to google calendar
  const { mutate: getSearchedCollaborators } = useRQPostARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        setFilteredData(data.data);
      }

      setLoadingUserBackend(false);
    },
    (data) => {
      setError(data);
      setLoadingUserBackend(false);
    }
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
