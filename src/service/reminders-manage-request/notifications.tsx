import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import {
  getAllNotificationLink,
  reminderWithIDLink,
  sharedReminderWithIDLink
} from "../../shared/service-link/url-link";
import { GetNotificationsResponse, GetReminderResponse, GetSharedReminderResponse, UseNotificationType } from "../../shared/types/service/ManageRequest";
import { NotificationData } from "../../shared/types/service/Reminder";

import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { useRQGetRecords, useRQUpdateARecord } from "./rest-request";

export function useNotification(): UseNotificationType {
  const { setReminderDetails, setSharedReminderDetails } = useContext(
    DetailOfAReminderContext
  );
  const queryClient = useQueryClient();

  const [aReminder, setAReminder] = useState<string>("");
  const [notificationsList, setNotificationsList] = useState<
    NotificationData[]
  >([]);
  const [error, setError] = useState<string>("");

  useRQGetRecords(
    "notifications",
    getAllNotificationLink(),
    true,
    (data: GetNotificationsResponse) => {
      data?.data !== undefined && setNotificationsList(data?.data);

      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => setError(err?.error as string)
  );

  const { refetch: refetchAReminder } = useRQGetRecords(
    ["aReminder", aReminder],
    reminderWithIDLink(aReminder),
    false,
    (data: GetReminderResponse) => {
      if (data.data !== undefined) {
        setReminderDetails(data?.data);

        queryClient.invalidateQueries("notifications");
      }

      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => {
      setError(err?.error as string);
    }
  );

  const { refetch: refetchASharedReminder } = useRQGetRecords(
    ["aSharedReminder", aReminder],
    sharedReminderWithIDLink(aReminder),
    false,
    (data: GetSharedReminderResponse) => {
      if (data.data !== undefined) {
        setSharedReminderDetails(data?.data);

        queryClient.invalidateQueries("notifications");
      }

      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => {
      setError(err?.error as string);
    }
  );

  const { mutate: updateSeenStatusAndRefreshAReminder } = useRQUpdateARecord(
    (data) => {
      data?.request?.status === 404 && setError(data?.message as string);
      refetchAReminder();
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
  );

  const { mutate: updateSeenStatusAndRefreshASharedReminder } =
    useRQUpdateARecord(
      (data) => {
        data?.request?.status === 404 && setError(data?.message as string);
        refetchASharedReminder();
      },
      (err) => {
        setError(err?.error as string);
      },
      () => {},
      () => {}
    );

  const { mutate: updateSeenStatusOnly } = useRQUpdateARecord(
    (data) => {
      data?.request?.status === 404 && setError(data?.message as string);
      if (data?.data !== undefined) {
        queryClient.invalidateQueries("notifications");
      }
    },
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {}
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
