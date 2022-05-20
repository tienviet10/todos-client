import React, { useContext } from "react";
//import { useRestPastReminder } from "../../service/reminders/pastreminders";
import {
  AiFillDelete,
  AiFillCaretUp,
  //AiOutlineStar,
} from "react-icons/ai";
import moment from "moment";
import Loader from "../shared/Loader";
import { ReminderContext } from "../../service/context/ReminderContext";
import { PastRemindersContext } from "../../service/context/PastRemindersContext";
import { DetailOfAReminderContext } from "../../service/context/DetailOfAReminderContext";
import { ConfirmationContext } from "../../service/context/ComfirmationToProceed";

export const PastReminders = () => {
  const { pastReminders, error, loading, discardRecord } =
    useContext(PastRemindersContext);

  const { updateRecord } = useContext(ReminderContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const { setConfirmationOn, setDescriptionText, setItemID, setFromWhere } =
    useContext(ConfirmationContext);

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
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
                onDoubleClick={() => {
                  item.status = "active";
                  discardRecord(item._id, false);
                  updateRecord(item, true);
                }}
              >
                <div
                  className={
                    item.status === "active"
                      ? "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-green-500"
                      : "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-red-500"
                  }
                >
                  <h5
                    className="text-gray-900 text-xl leading-tight font-medium mb-2 truncate px-8 max-w-[250px] sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.title}
                  </h5>
                  <p
                    className="text-gray-700 text-base mb-4 truncate max-w-[250px] sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.description}
                  </p>
                  <div className="flex gap-6 justify-center mt-7">
                    <AiFillCaretUp
                      className="hover:cursor-pointer"
                      size={25}
                      color="green"
                      onClick={() => {
                        item.status = "active";
                        discardRecord(item._id, false);
                        updateRecord(item, true);
                      }}
                    />
                    <AiFillDelete
                      className="hover:cursor-pointer"
                      color="red"
                      size={25}
                      onClick={() => {
                        setItemID(item._id);
                        setFromWhere("past");
                        setDescriptionText({
                          titleText: "Delete A Reminder",
                          displayText:
                            "Are you sure you want to delete the reminder?",
                          confirmText: "Accept",
                          declineText: "Cancel",
                        });
                        setConfirmationOn(true);
                        //discardRecord(item._id, true);
                      }}
                    />
                  </div>
                  <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                    {moment(item.createdAt).fromNow()}
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
