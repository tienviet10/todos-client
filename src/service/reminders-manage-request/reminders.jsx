import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { REMINDER_STATUS } from "../../shared/constant/config";
import {
  addReminderGoogleCalendarLink,
  getActiveRemindersLink,
  pastRemindersLink,
  updateMultipleRemindersLink,
} from "../../shared/service-link/url-link";
import { AuthContext } from "../context/AuthServiceContext";
import {
  useRQCreateARecord,
  useRQDeleteARecord,
  useRQGetRecords,
  useRQUpdateARecord,
} from "./rest-request";

export function useRestOperationReminder() {
  const [allReminders, setAllReminders] = useState(null);
  const [error, setError] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //// Update reminders that past due date inside useRQGetRecords below
  const { mutate: mutateUpdateDueReminder } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  //Request for active reminders
  const { isLoading: loading } = useRQGetRecords(
    "reminders",
    getActiveRemindersLink(),
    isAuth,
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);

      if (data.data !== undefined) {
        const newUpdate = [];
        const pastDueRemindersTemp = [];
        const updateRepeatReminders = [];
        const yesterdayEndDate = new Date(
          new Date(new Date().setHours(23, 59, 59)).setDate(
            new Date().getDate() - 1
          )
        );
        const currentTimeDate = new Date();
        for (const record of data.data) {
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
            url: updateMultipleRemindersLink(),
            data: updateRepeatReminders,
          });
        }

        if (pastDueRemindersTemp.length > 0) {
          mutateUpdateDueReminder({
            url: pastRemindersLink(),
            data: pastDueRemindersTemp,
          });
        }

        setAllReminders(newUpdate);
      }
    },
    (data) => setError(data)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, newReminder, context) => {
      queryClient.setQueryData("reminders", context.previousReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("reminders");
      const previousReminders = queryClient.getQueryData("reminders");

      //Optimistic update
      queryClient.setQueryData("reminders", (old) => {
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
      queryClient.invalidateQueries("reminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Add a record to GoogleCalendar
  const { mutate: addRecordToGoogleCalendar } = useRQCreateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  //Add a record to mongodb then to google calendar
  const { mutate: addRecord } = useRQCreateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        const endTime = new Date(data.data.remindedAt);
        addRecordToGoogleCalendar({
          url: addReminderGoogleCalendarLink(),
          data: {
            summary: data.data.title,
            description: data.data.description,
            startTime: data.data.remindedAt.replace("Z", "+00:00"),
            endTime: new Date(endTime.setMinutes(endTime.getMinutes() + 5))
              .toISOString()
              .replace("Z", "+00:00"),
            recurrence: data.data.repeat,
            location: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        queryClient.invalidateQueries("reminders");
        queryClient.invalidateQueries("notifications");
      }
    },
    (data) => setError(data)
  );

  //Update a record
  const { mutate: updateRecord } = useRQUpdateARecord(
    () => {},
    (err, newReminder, context) => {
      queryClient.setQueryData("reminders", context.previousReminders);
      queryClient.setQueryData("pastReminders", context.previousPastReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("reminders");
      await queryClient.cancelQueries("pastReminders");

      const previousReminders = queryClient.getQueryData("reminders");
      const previousPastReminders = queryClient.getQueryData("pastReminders");

      ////Optimistic update
      if (data.from === "past") {
        //Add reminder sent from the "past-reminder" section
        queryClient.setQueryData("reminders", (old) => {
          return {
            ...old,
            data: [...old.data, data.data],
          };
        });
        //Delete the reminder from the "past-reminder" section
        queryClient.setQueryData("pastReminders", (old) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder) => reminder._id !== data.url.split("/")[3]
            ),
          };
        });
      } else if (data.from === "currentToPast") {
        //Delete the reminder from the "active-reminder" section
        queryClient.setQueryData("reminders", (old) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder) => reminder._id !== data.url.split("/")[3]
            ),
          };
        });
        //Add the reminder from the "active-reminder" section to the "past-reminder" section
        queryClient.setQueryData("pastReminders", (old) => {
          return {
            ...old,
            data: [...old.data, data.data],
          };
        });
      } else {
        //Update all other details from the reminder
        queryClient.setQueryData("reminders", (old) => {
          return {
            ...old,
            data: old.data.map((reminder) =>
              reminder._id === data.data._id
                ? {
                    ...reminder,
                    title: data.data.title,
                    description: data.data.description,
                    favorite: data.data.favorite,
                    color: data.data.color,
                    remindedAt: data.data.remindedAt,
                    repeat: data.data.repeat,
                  }
                : reminder
            ),
          };
        });
      }

      return { previousReminders, previousPastReminders };
    },
    () => {
      queryClient.invalidateQueries("reminders");
      queryClient.invalidateQueries("pastReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Update a record
  const { mutate: updateMultipleRecords } = useRQUpdateARecord(
    () => {},
    (err, newReminder, context) => {
      setError(err);
    },
    () => {},
    () => {
      queryClient.invalidateQueries("reminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  return {
    allReminders,
    error,
    loading,
    discardRecord,
    addRecord,
    updateRecord,
  };
}