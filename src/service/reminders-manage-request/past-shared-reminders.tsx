import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastSharedRemindersLink } from "../../shared/service-link/url-link";
import { GetListSharedRemindersResponse, RestPastSharedReminderType } from "../../shared/types/service/ManageRequest";
import { SharedReminder } from "../../shared/types/service/Reminder";
import { useRQDeleteARecord, useRQGetRecords } from "./rest-request";

export function useRestPastSharedReminder(): RestPastSharedReminderType {
  const [pastSharedReminders, setPastSharedReminders] = useState<
    SharedReminder[] | null
  >(null);
  const [error, setError] = useState<string>("");
  const [isPastSharedRemindersOn, setIsPastSharedRemindersOn] =
    useState<boolean>(false);
  const queryClient = useQueryClient();

  //Get past reminders
  const { isLoading: loading } = useRQGetRecords(
    "sharedPastReminders",
    pastSharedRemindersLink(),
    isPastSharedRemindersOn,
    (data: GetListSharedRemindersResponse) => {
      data?.data !== undefined && setPastSharedReminders(data?.data);

      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => setError(err?.error as string)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData(
        "sharedPastReminders",
        context.previousReminders
      );
      setError(err?.error as string);
    },
    async (data: string) => {
      await queryClient.cancelQueries("sharedPastReminders");
      const previousReminders = queryClient.getQueryData("sharedPastReminders");

      //Optimistic update
      queryClient.setQueryData("sharedPastReminders", (old: any) => {
        return {
          ...old,
          data: old.data.filter(
            (reminder: SharedReminder) => reminder._id !== data.split("/")[3]
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
