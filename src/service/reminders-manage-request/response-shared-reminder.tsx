import { useState } from "react";
import { useQueryClient } from "react-query";
import { UseRestResponseSharedReminderType } from "../../shared/types/service/ManageRequest";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseSharedReminder():UseRestResponseSharedReminderType  {
  const [error, setError] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: acceptOrDeclinedSharedReminderRequest } = useRQUpdateARecord(
    (data) => {
      data?.request.status === 404 && setError(data?.message as string);
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sharedReminders");
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
  );

  return {
    error,
    acceptOrDeclinedSharedReminderRequest,
  };
}
