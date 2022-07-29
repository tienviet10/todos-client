import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import {
  getAllNotificationLink,
  reminderWithIDLink,
  sharedReminderWithIDLink,
} from "../../shared/service-link/url-link";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { useRQGetRecords, useRQUpdateARecord } from "./rest-request";

export function useNotification() {
  const { setReminderDetails, setSharedReminderDetails } = useContext(
    DetailOfAReminderContext
  );
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

  const { refetch: refetchASharedReminder } = useRQGetRecords(
    ["aSharedReminder", aReminder],
    sharedReminderWithIDLink(aReminder),
    false,
    (data) => {
      if (data.data !== undefined) {
        setSharedReminderDetails(data.data);

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

  const { mutate: updateSeenStatusAndRefreshAReminder } = useRQUpdateARecord(
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

  const { mutate: updateSeenStatusAndRefreshASharedReminder } =
    useRQUpdateARecord(
      (data) => {
        data.response !== undefined &&
          data.response.status === 404 &&
          setError(data.message);
        refetchASharedReminder();
      },
      (data) => {
        setError(data);
      }
    );

  const { mutate: updateSeenStatusOnly } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        queryClient.invalidateQueries("notifications");
      }
    },
    (data) => {
      setError(data);
    }
  );

  return {
    notificationsList,
    error,
    updateSeenStatusAndRefreshAReminder,
    updateSeenStatusAndRefreshASharedReminder,
    updateSeenStatusOnly,
    setAReminder,
    refetchAReminder,
    refetchASharedReminder,
  };
}
