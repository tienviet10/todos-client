import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastSharedRemindersLink } from "../../shared/service-link/url-link";
import { useRQDeleteARecord, useRQGetRecords } from "./rest-request";

export function useRestPastSharedReminder() {
  const [pastSharedReminders, setPastSharedReminders] = useState(null);
  const [error, setError] = useState(null);
  const [isPastSharedRemindersOn, setIsPastSharedRemindersOn] = useState(false);
  const queryClient = useQueryClient();

  //Get past reminders
  const { isLoading: loading } = useRQGetRecords(
    "sharedPastReminders",
    pastSharedRemindersLink(),
    isPastSharedRemindersOn,
    (data) => {
      data.data !== undefined && setPastSharedReminders(data.data);
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, newReminder, context) => {
      queryClient.setQueryData(
        "sharedPastReminders",
        context.previousReminders
      );
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("sharedPastReminders");
      const previousReminders = queryClient.getQueryData("sharedPastReminders");

      //Optimistic update
      queryClient.setQueryData("sharedPastReminders", (old) => {
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
      queryClient.invalidateQueries("sharedPastReminders");
    }
  );

  return {
    pastSharedReminders,
    error,
    loading,
    discardRecord,
    setIsPastSharedRemindersOn,
    isPastSharedRemindersOn,
  };
}
