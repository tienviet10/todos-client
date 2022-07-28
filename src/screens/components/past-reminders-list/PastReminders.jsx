import { format, formatDistance } from "date-fns";
import React from "react";
import { AiFillCaretUp, AiFillDelete } from "react-icons/ai";
import { useManagePastRemindersState } from "../../../service/reminders-manage-state/manage-past-reminders-state";
import Loader from "../../../shared/components/loading-spinner/CenterLoader";

export const PastReminders = () => {
  const {
    pastReminders,
    error,
    loading,
    restorePastReminder,
    handleDetailsScreen,
    execDeletion,
  } = useManagePastRemindersState();

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
              // Card
              <div
                key={item._id}
                className="flex justify-center"
                onDoubleClick={() => restorePastReminder(item)}
              >
                <div className="block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-red-500">
                  <div onClick={() => handleDetailsScreen(item)}>
                    {/* Reminder title */}
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 max-w-[300px] truncate px-8 sm:max-w-[330px]">
                      {item.title}
                    </h5>
                    {/* Date time of the reminder */}
                    <div className="font-medium text-sm text-gray-500">
                      {item.remindedAt
                        ? format(new Date(item.remindedAt), "PPPP")
                        : "----No-Date----"}
                    </div>
                    <div className="font-medium mb-5 text-sm h-4 text-gray-500">
                      {item.remindedAt &&
                        format(new Date(item.remindedAt), "p")}
                    </div>

                    {/* Reminder description */}
                    <p className="text-gray-700 text-base mb-4 truncate max-w-[300px] sm:max-w-[330px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Button choice (restore, delete) */}
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

                  {/* Time Elapse since the reminder was created */}
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
