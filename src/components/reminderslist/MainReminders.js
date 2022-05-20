import React, { useContext } from "react";
import moment from "moment";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineFileDone,
  AiOutlineStar,
} from "react-icons/ai";
import { ModalContext } from "../../service/context/ModalContext";
import { ReminderContext } from "../../service/context/ReminderContext";
import { PastRemindersContext } from "../../service/context/PastRemindersContext";
import { DetailOfAReminderContext } from "../../service/context/DetailOfAReminderContext";
import { ConfirmationContext } from "../../service/context/ComfirmationToProceed";

export const MainReminders = () => {
  const { reminders, updateRecord, discardRecord } =
    useContext(ReminderContext);
  const { setModalOn, setNewReminder } = useContext(ModalContext);
  const { addRecordFromActive } = useContext(PastRemindersContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const { setConfirmationOn, setDescriptionText, setHoldCallback } =
    useContext(ConfirmationContext);

  const editStatus = (item) => {
    const currentStatus = item.status;
    currentStatus === "active"
      ? (item.status = "deactive")
      : (item.status = "active");
    updateRecord(item, false);
  };

  const editFavorite = (item) => {
    item.favorite = true;
    updateRecord(item, false);
  };

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    setDescriptionText({
      titleText: "Delete A Reminder",
      displayText: "Are you sure you want to delete the reminder?",
      confirmText: "Accept",
      declineText: "Cancel",
    });
    setHoldCallback(() => () => discardRecord(itemId));
    setConfirmationOn(true);
  };

  return (
    <>
      <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
        Reminders:
      </h2>
      <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
        {reminders &&
          reminders.map((item) => (
            <div
              key={item._id}
              className="flex justify-center"
              onDoubleClick={() => {
                editStatus(item);
                addRecordFromActive(item);
              }}
            >
              <div
                className={
                  item.status === "active"
                    ? "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-green-500"
                    : "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-red-500"
                }
              >
                <AiOutlineStar
                  className="hover:cursor-pointer float-right mr-[-5%]"
                  size={25}
                  onClick={() => editFavorite(item)}
                />

                <h5
                  className="text-gray-900 text-xl leading-tight font-medium mb-2 truncate px-8 max-w-[250px] sm:max-w-[330px]"
                  onClick={() => handleDetailsScreen(item)}
                >
                  {item.title}
                </h5>
                <p
                  className="text-gray-700 text-base px-6 mb-4 truncate max-w-[250px] sm:max-w-[330px]"
                  onClick={() => handleDetailsScreen(item)}
                >
                  {item.description}
                </p>
                <div className="flex gap-6 justify-center mt-7">
                  <AiOutlineFileDone
                    className="hover:cursor-pointer"
                    color="#6366f1"
                    size={25}
                    onClick={() => {
                      editStatus(item);
                      addRecordFromActive(item);
                    }}
                  />
                  <AiFillEdit
                    className="hover:cursor-pointer"
                    size={25}
                    onClick={() => {
                      setModalOn(true);
                      setNewReminder({
                        title: item.title,
                        description: item.description,
                        status: "active",
                        favorite: item.favorite,
                        _id: item._id,
                      });
                    }}
                  />
                  <AiFillDelete
                    className="hover:cursor-pointer"
                    color="red"
                    size={25}
                    onClick={() => execDeletion(item._id)}
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
  );
};
