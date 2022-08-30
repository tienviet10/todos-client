import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { REMINDER_STATUS } from "../../shared/constant/config";
import {
  getActiveSharedRemindersLink,
  pastSharedRemindersLink,
  updateMultipleSharedRemindersLink,
} from "../../shared/service-link/url-link";
import { AuthContext } from "../context/AuthServiceContext";
import {
  useRQDeleteARecord,
  useRQGetRecords,
  useRQPostARecord,
  useRQUpdateARecord,
} from "./rest-request";

export function useRestOperationSharedReminder() {
  const [allSharedReminders, setAllSharedReminders] = useState([]);
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
    "sharedReminders",
    getActiveSharedRemindersLink(),
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
    (data) => setError(data)
  );

  //Delete a record
  const { mutate: discardSharedRecord } = useRQDeleteARecord(
    () => {},
    (err, newReminder, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("sharedReminders");
      const previousReminders = queryClient.getQueryData("sharedReminders");

      //Optimistic update
      queryClient.setQueryData("sharedReminders", (old) => {
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
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Add a record to mongodb then to google calendar
  const { mutate: addSharedRecord } = useRQPostARecord(
    () => {},
    (err, reminder, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("sharedReminders");
      const previousReminders = queryClient.getQueryData("sharedReminders");

      const newReminderToAdd = {
        ...data.data,
        _id: Math.floor(Math.random() * 1000).toString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        remindedAt: data.data.remindedAt.toISOString(),
      };

      //Optimistic update
      queryClient.setQueryData("sharedReminders", (old) => {
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
    (err, newReminder, context) => {
      queryClient.setQueryData("sharedReminders", context.previousReminders);
      queryClient.setQueryData(
        "sharedPastReminders",
        context.previousPastReminders
      );
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("sharedReminders");
      await queryClient.cancelQueries("sharedPastReminders");

      const previousReminders = queryClient.getQueryData("sharedReminders");
      const previousPastReminders = queryClient.getQueryData(
        "sharedPastReminders"
      );

      ////Optimistic update
      if (data.from === "past") {
        //Add reminder sent from the "past-reminder" section
        queryClient.setQueryData("sharedReminders", (old) => {
          return {
            ...old,
            data: [...old.data, data.data],
          };
        });
        //Delete the reminder from the "past-reminder" section
        queryClient.setQueryData("sharedPastReminders", (old) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder) => reminder._id !== data.url.split("/")[3]
            ),
          };
        });
      } else if (data.from === "currentToPast") {
        //Delete the reminder from the "active-reminder" section
        queryClient.setQueryData("sharedReminders", (old) => {
          return {
            ...old,
            data: old.data.filter(
              (reminder) => reminder._id !== data.url.split("/")[3]
            ),
          };
        });
        //Add the reminder from the "active-reminder" section to the "past-reminder" section
        queryClient.setQueryData("sharedPastReminders", (old) => {
          const pastDueData = old
            ? {
                ...old,
                data: [data.data, ...old.data],
              }
            : {};
          return pastDueData;
        });
      } else {
        //Update all other details from the reminder
        queryClient.setQueryData("sharedReminders", (old) => {
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
      queryClient.invalidateQueries("sharedReminders");
      queryClient.invalidateQueries("sharedPastReminders");
      queryClient.invalidateQueries("notifications");
      queryClient.invalidateQueries("sevenRemindersSummary");
    }
  );

  //Update multiple records
  const { mutate: updateMultipleRecords } = useRQUpdateARecord(
    () => {},
    (err, newReminder, context) => {
      setError(err);
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
