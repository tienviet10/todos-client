import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRQUpdateARecord } from "./rest-request";

export function useRestResponseSharedReminder() {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: acceptOrDeclinedSharedReminderRequest } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sharedReminders");
    },
    (err, friends, context) => {
      setError(err);
    },
    () => {},
    () => {}
  );

  return {
    error,
    acceptOrDeclinedSharedReminderRequest,
  };
}
