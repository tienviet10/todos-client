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
import { ConfirmationContext } from "../../service/context/ConfirmationToProceedContext";
import { REMINDER_STATUS } from "../config";

export const MainReminders = () => {
  const { reminders, updateRecord, discardRecord } =
    useContext(ReminderContext);
  const { setModalOn, setNewReminder } = useContext(ModalContext);
  const { addRecordFromActive } = useContext(PastRemindersContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const { confirm } = useContext(ConfirmationContext);

  const editStatus = (item) => {
    item.status === REMINDER_STATUS.ACTIVE
      ? updateRecord({ ...item, status: REMINDER_STATUS.INACTIVE }, false)
      : updateRecord({ ...item, status: REMINDER_STATUS.ACTIVE }, false);
  };

  const editFavorite = (item) => {
    updateRecord({ ...item, favorite: true }, false);
  };

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    confirm({
      onSuccess: () => discardRecord(itemId),
    });
  };

  const moveReminderToPast = (item) => {
    editStatus(item);
    addRecordFromActive(item);
  };

  const editReminder = (item) => {
    setModalOn(true);
    setNewReminder({
      title: item.title,
      description: item.description,
      status: REMINDER_STATUS.ACTIVE,
      favorite: item.favorite,
      _id: item._id,
    });
  };

  return (
    <>
      {reminders && reminders.length > 0 && (
        <div>
          <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
            Reminders:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {reminders.map((item) => (
              <div
                key={item._id}
                className="flex justify-center"
                onDoubleClick={() => moveReminderToPast(item)}
              >
                <div className="block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500">
                  <AiOutlineStar
                    className="hover:cursor-pointer float-right mr-[-5%]"
                    size={25}
                    onClick={() => editFavorite(item)}
                  />

                  <h5
                    className="text-gray-900 text-xl font-medium mb-2 truncate max-w-[300px] sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.title}
                  </h5>
                  <p
                    className="text-gray-700 text-base px-6 mb-4 truncate max-w-[300px] sm:max-w-[330px]"
                    onClick={() => handleDetailsScreen(item)}
                  >
                    {item.description}
                  </p>
                  <div className="flex gap-6 justify-center mt-7">
                    <AiOutlineFileDone
                      className="hover:cursor-pointer"
                      color="#6366f1"
                      size={25}
                      onClick={() => moveReminderToPast(item)}
                    />
                    <AiFillEdit
                      className="hover:cursor-pointer"
                      size={25}
                      onClick={() => editReminder(item)}
                    />
                    <AiFillDelete
                      className="hover:cursor-pointer"
                      color="red"
                      size={25}
                      onClick={() => execDeletion(item._id)}
                    />
                  </div>
                  {/* <select id="nname" className="mt-4">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Merc</option>
                  <option value="audi">Audi</option>
                </select> */}
                  <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                    {moment(item.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
