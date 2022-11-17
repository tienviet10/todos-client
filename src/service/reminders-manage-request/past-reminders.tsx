import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastRemindersLink } from "../../shared/service-link/url-link";
import { GetListRemindersResponse, RestPastReminderType } from "../../shared/types/service/ManageRequest";
import { Reminder } from "../../shared/types/service/Reminder";
import { useRQDeleteARecord, useRQGetRecords } from "./rest-request";

export function useRestPastReminder(): RestPastReminderType {
  const [pastReminders, setPastReminders] = useState<Reminder[] | null>(null);
  const [error, setError] = useState<string>("");
  const [isPastRemindersOn, setIsPastRemindersOn] = useState<boolean>(false);
  const queryClient = useQueryClient();

  //Get past reminders
  const { isLoading: loading } = useRQGetRecords(
    "pastReminders",
    pastRemindersLink(),
    isPastRemindersOn,
    (data: GetListRemindersResponse) => {
      data?.request?.status === 404 && setError(data?.message as string);

      data?.data !== undefined && setPastReminders(data?.data);
    },
    (err) => setError(err?.error as string)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData("pastReminders", context.previousReminders);
      setError(err?.error as string);
    },
    async (data: string) => {
      await queryClient.cancelQueries("pastReminders");
      const previousReminders = queryClient.getQueryData("pastReminders");

      //Optimistic update
      queryClient.setQueryData("pastReminders", (old: any) => {
        return {
          ...old,
          data: old.data.filter(
            (reminder: Reminder) => reminder._id !== data.split("/")[3]
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
