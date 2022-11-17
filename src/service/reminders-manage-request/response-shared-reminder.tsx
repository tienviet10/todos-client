import { useState } from "react";
import { useQueryClient } from "react-query";
import { AcceptDeclineSharedReminderType } from "../../shared/types/MutationFuncType";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseSharedReminder(): {
  error: string;
  acceptOrDeclinedSharedReminderRequest: AcceptDeclineSharedReminderType;
} {
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
