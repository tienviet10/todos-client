import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastRemindersLink } from "../../shared/service-link/url-link";
import { useRQDeleteARecord, useRQGetRecords } from "./rest-request";

export function useRestPastReminder() {
  const [pastReminders, setPastReminders] = useState(null);
  const [error, setError] = useState(null);
  const [isPastRemindersOn, setIsPastRemindersOn] = useState(false);
  const queryClient = useQueryClient();

  //Get past reminders
  const { isLoading: loading } = useRQGetRecords(
    "pastReminders",
    pastRemindersLink(),
    isPastRemindersOn,
    (data) => {
      data.data !== undefined && setPastReminders(data.data);
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (err) => setError(err)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData("pastReminders", context.previousReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("pastReminders");
      const previousReminders = queryClient.getQueryData("pastReminders");

      //Optimistic update
      queryClient.setQueryData("pastReminders", (old) => {
        return {
          ...old,
          data: old.data.filter(
            (reminder) => reminder._id !== data.split("/")[3]
          ),
        };
      });

      return { previousReminders };
    },
    () => {
      queryClient.invalidateQueries("pastReminders");
    }
  );

  return {
    pastReminders,
    error,
    loading,
    discardRecord,
    setIsPastRemindersOn,
    isPastRemindersOn,
  };
}
