import { format, formatDistance } from "date-fns";
import React, { useContext } from "react";
import { AiFillCaretUp, AiFillDelete } from "react-icons/ai";
import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
import { ReminderContext } from "../../../service/context/ReminderContext";
import { REMINDER_STATUS } from "../../constant/config";
import { reminderWithIDLink } from "../../service/url-link";
import Loader from "../general/Loader";

export const PastReminders = () => {
  const {
    pastReminders,
    error,
    loading,
    discardRecord: discardRecordPastReminder,
  } = useContext(PastRemindersContext);

  const { updateRecord } = useContext(ReminderContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const { confirm } = useContext(ConfirmationContext);

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    confirm({
      onSuccess: () => discardRecordPastReminder(reminderWithIDLink(itemId)),
    });
  };

  const restorePastReminder = (item) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateRecord({
      from: "past",
      url: reminderWithIDLink(item._id),
      data: {
        ...item,
        status: REMINDER_STATUS.ACTIVE,
        remindedAt:
          new Date(item.remindedAt) < yesterdayEndDate ? null : item.remindedAt,
      },
    });
  };

  if (loading)
    return (
      <div className="mt-10">
        <Loader />
      </div>
    );

  if (error)
    return <div className="mt-10 mx-auto">Something went wrong...</div>;

  return (
    <div>
      {pastReminders && pastReminders.length > 0 ? (
        <>
          <h2 className="max-w-[1240px] w-full mx-auto pt-10 sm:pt-5 text-2xl font-bold px-4">
            Past Reminders:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {pastReminders.map((item) => (
              <div
                key={item._id}
                className="flex justify-center"
                onDoubleClick={() => restorePastReminder(item)}
              >
                <div className="block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-red-500">
                  <h5
                    className="text-gray-900 text-xl leading-tight font-medium mb-2 max-w-[300px] truncate px-8 sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.title}
                  </h5>
                  <div
                    className="font-medium text-sm text-gray-500"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.remindedAt
                      ? format(new Date(item.remindedAt), "PPPP")
                      : "----No-Date----"}
                  </div>
                  <div
                    className="font-medium mb-5 text-sm h-4 text-gray-500"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.remindedAt && format(new Date(item.remindedAt), "p")}
                  </div>
                  <p
                    className="text-gray-700 text-base mb-4 truncate max-w-[300px] sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.description}
                  </p>
                  <div className="flex gap-6 justify-center mt-8">
                    <AiFillCaretUp
                      className="hover:cursor-pointer"
                      size={25}
                      color="green"
                      onClick={() => restorePastReminder(item)}
                    />
                    <AiFillDelete
                      className="hover:cursor-pointer"
                      color="red"
                      size={25}
                      onClick={() => execDeletion(item._id)}
                    />
                  </div>
                  <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                    {formatDistance(Date.parse(item.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-xl">No Past reminders!</div>
      )}
    </div>
  );
};
