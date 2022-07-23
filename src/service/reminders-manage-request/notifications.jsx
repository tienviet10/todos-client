import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import {
  getAllNotificationLink,
  reminderWithIDLink,
} from "../../shared/service-link/url-link";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { useRQGetRecords, useRQUpdateARecord } from "./rest-request";

export function useNotification() {
  const { setReminderDetails } = useContext(DetailOfAReminderContext);
  const queryClient = useQueryClient();

  const [aReminder, setAReminder] = useState();
  const [notificationsList, setNotificationsList] = useState([]);
  const [error, setError] = useState(null);

  useRQGetRecords(
    "notifications",
    getAllNotificationLink(),
    true,
    (data) => {
      data.data !== undefined && setNotificationsList(data.data);
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  const { refetch: refetchAReminder } = useRQGetRecords(
    ["aReminder", aReminder],
    reminderWithIDLink(aReminder),
    false,
    (data) => {
      if (data.data !== undefined) {
        setReminderDetails(data.data);

        queryClient.invalidateQueries("notifications");
      }
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => {
      setError(data);
    }
  );

  const { mutate } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      refetchAReminder();
    },
    (data) => {
      setError(data);
    }
  );

  return {
    notificationsList,
    error,
    mutate,
    setAReminder,
    refetchAReminder,
  };
}
