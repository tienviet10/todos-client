import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { REMINDER_STATUS } from "../../shared/constant/config";
import {
  getActiveSharedRemindersLink,
  pastSharedRemindersLink,
  updateMultipleSharedRemindersLink
} from "../../shared/service-link/url-link";
import { GetListSharedRemindersResponse, GetSharedReminderResponse, RestOperationSharedReminder } from "../../shared/types/service/ManageRequest";

import { SharedReminder } from "../../shared/types/service/Reminder";
import {
  NewSharedReminderData
} from "../../shared/types/service/RESTRequestDataType";
import { AuthContext } from "../context/AuthServiceContext";
import {
  useRQDeleteARecord,
  useRQGetRecords,
  useRQPostARecord,
  useRQUpdateARecord
} from "./rest-request";

export function useRestOperationSharedReminder(): RestOperationSharedReminder {
  const [allSharedReminders, setAllSharedReminders] = useState<
    SharedReminder[]
  >([]);
  const [error, setError] = useState<string>("");
  const { isAuth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //// Update reminders that past due date inside useRQGetRecords below
  const { mutate: mutateUpdateDueReminder } = useRQUpdateARecord(
    (data) => {
      // message: "Successfully update due reminders"

      data?.request?.status === 404 && setError(data?.message as string);
    },
    (err) => setError(err?.error as string),
    () => {},
    () => {}
  );

  //Request for active reminders
  const { isLoading: loading } = useRQGetRecords(
    "sharedReminders",
    getActiveSharedRemindersLink(),
    isAuth,
    (data: GetListSharedRemindersResponse) => {
      data?.request?.status === 404 && setError(data?.message as string);

      if (data?.data !== undefined) {
        const newUpdate: SharedReminder[] = [];
        const pastDueRemindersTemp: SharedReminder[] = [];
        const updateRepeatReminders: SharedReminder[] = [];
        const yesterdayEndDate = new Date(
          new Date(new Date().setHours(23, 59, 59)).setDate(
            new Date().getDate() - 1
          )
        );
        const currentTimeDate = new Date();

        for (const record of data?.data) {
          if (record.remindedAt) {
            let currentRemindedAt = new Date(record.remindedAt);

            //If the reminder past due date, move it to past-reminder section instead of showing in active-reminder
            if (
              record.repeat &&
              record.repeat !== "none" &&
              currentRemindedAt < currentTimeDate
            ) {
              let count = 1; //This constant is using in Monthly repeat

              while (currentRemindedAt < currentTimeDate) {
                if (record.repeat === "HOURLY") {
                  currentRemindedAt.setHours(currentRemindedAt.getHours() + 1);
                } else if (record.repeat === "DAILY") {
                  currentRemindedAt.setDate(currentRemindedAt.getDate() + 1);
                } else if (record.repeat === "WEEKLY") {
                  currentRemindedAt.setDate(currentRemindedAt.getDate() + 7);
                } else if (record.repeat === "MONTHLY") {
                  // Create a reference to change var and check date
                  const newTempDate = new Date(currentRemindedAt);

                  if (
                    new Date(
                      newTempDate.setMonth(newTempDate.getMonth() + count)
                    ).getDate() === new Date(currentRemindedAt).getDate()
                  ) {
                    currentRemindedAt.setMonth(
                      currentRemindedAt.getMonth() + count
                    );
                    break;
                  }
                  count++;
                } else if (record.repeat === "yearly") {
                  currentRemindedAt.setFullYear(
                    currentRemindedAt.getFullYear() + 1
                  );
                }
              }

              const updateNewRecord = {
                ...record,
                remindedAt: currentRemindedAt,
              };

              updateRepeatReminders.push(updateNewRecord);
              newUpdate.push(updateNewRecord);
            } else if (currentRemindedAt < yesterdayEndDate) {
              pastDueRemindersTemp.push({
                ...record,
                status: REMINDER_STATUS.INACTIVE,
              });
            } else {
              newUpdate.push({ ...record, remindedAt: currentRemindedAt });
            }
          } else {
            newUpdate.push(record);
          }
        }
        if (updateRepeatReminders.length > 0) {
          updateMultipleRecords({
            url: updateMultipleSharedRemindersLink(),
            data: updateRepeatReminders,
          });
        }
        if (pastDueRemindersTemp.length > 0) {
          mutateUpdateDueReminder({
            url: pastSharedRemindersLink(),
            data: pastDueRemindersTemp,
          });
        }
        setAllSharedReminders(newUpdate);
      }
    },
    (err) => setError(err?.error as string)
  );

  //Delete a record
  const { mutate: discardSharedRecord } = useRQDeleteARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      setError(err?.error as string);
    },
    async (data) => {
      await queryClient.cancelQueries("sharedReminders");
      const previousReminders = queryClient.getQueryData("sharedReminders");

      //Optimistic update
      queryClient.setQueryData("sharedReminders", (old: any) => {
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
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Add a record to mongodb then to google calendar
  const { mutate: addSharedRecord } = useRQPostARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      setError(err?.error as string);
    },
    async (data: GetSharedReminderResponse) => {
      await queryClient.cancelQueries("sharedReminders");
      const previousReminders = queryClient.getQueryData("sharedReminders");

      const newReminderToAdd = {
        ...data?.data,
        _id: Math.floor(Math.random() * 1000).toString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        remindedAt: data?.data?.remindedAt?.toISOString(),
      };

      //Optimistic update
      queryClient.setQueryData("sharedReminders", (old: any) => {
        return {
          ...old,
          data: [newReminderToAdd, ...old.data],
        };
      });

      return { previousReminders };
    },
    () => {
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("notifications");
    }
  );

  //Update a record
  const { mutate: updateSharedRecord } = useRQUpdateARecord(
    () => {},
    (err, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      queryClient.setQueryData(
        "sharedPastReminders",
        context.previousPastReminders
      );
      setError(err?.error as string);
    },
    async (data: NewSharedReminderData) => {
      await queryClient.cancelQueries("sharedReminders");
      await queryClient.cancelQueries("sharedPastReminders");

      const previousReminders = queryClient.getQueryData("sharedReminders");
      const previousPastReminders = queryClient.getQueryData(
        "sharedPastReminders"
      );

      ////Optimistic update
      if (data?.from === "past") {
        //Add reminder sent from the "past-reminder" section
        queryClient.setQueryData("sharedReminders", (old: any) => {
          return {
            ...old,
            data: [...old.data, data?.data],
          };
        });
        //Delete the reminder from the "past-reminder" section
        queryClient.setQueryData("sharedPastReminders", (old: any) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder: SharedReminder) =>
                reminder._id !== data?.url.split("/")[3]
            ),
          };
        });
      } else if (data?.from === "currentToPast") {
        //Delete the reminder from the "active-reminder" section
        queryClient.setQueryData("sharedReminders", (old: any) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder: SharedReminder) =>
                reminder._id !== data?.url.split("/")[3]
            ),
          };
        });
        //Add the reminder from the "active-reminder" section to the "past-reminder" section
        queryClient.setQueryData("sharedPastReminders", (old: any) => {
          const pastDueData = old
            ? {
                ...old,
                data: [data?.data, ...old.data],
              }
            : {};
          return pastDueData;
        });
      } else {
        const reminderData = data?.data as SharedReminder;
        //Update all other details from the reminder
        queryClient.setQueryData("sharedReminders", (old: any) => {
          return {
            ...old,
            data: old.data.map((reminder: SharedReminder) =>
              reminder._id === reminderData._id
                ? {
                    ...reminder,
                    title: reminderData.title,
                    description: reminderData.description,
                    // favorite: reminderData.favorite,
                    color: reminderData.color,
                    remindedAt: reminderData.remindedAt,
                    repeat: reminderData.repeat,
                  }
                : reminder
            ),
          };
        });
      }

      return { previousReminders, previousPastReminders };
    },
    () => {
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("sharedPastReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Update multiple records
  const { mutate: updateMultipleRecords } = useRQUpdateARecord(
    () => {},
    (err) => {
      setError(err?.error as string);
    },
    () => {},
    () => {
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  return {
    allSharedReminders,
    error,
    loading,
    discardSharedRecord,
    addSharedRecord,
    updateSharedRecord,
  };
}
