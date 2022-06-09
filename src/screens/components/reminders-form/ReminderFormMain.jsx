import React, { useContext, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ModalContext } from "../../../service/context/ModalContext";
import { ReminderContext } from "../../../service/context/ReminderContext";
import { CloseButton } from "../../../shared/components/CloseButton";
import { REMINDER_STATUS } from "../../../shared/constant/config";
import {
  remindersGeneralLink,
  reminderWithIDLink,
} from "../../../shared/service-link/url-link";

const createEmptyReminder = {
  title: "",
  description: "",
  status: REMINDER_STATUS.ACTIVE,
  favorite: false,
  _id: "",
};

export const ReminderFormMain = () => {
  const { addRecord, updateRecord } = useContext(ReminderContext);

  const { newReminder, setNewReminder, setModalOn } = useContext(ModalContext);
  const {
    title,
    description,
    _id,
    favorite: favFromEdit,
    remindedAt,
    repeat,
  } = newReminder;
  const [favorite, setFavorite] = useState(favFromEdit);

  const handleFavoriteChange = () => {
    setNewReminder({
      ...newReminder,
      favorite: !favorite,
    });
    setFavorite(!favorite);
  };

  const handleChange = (name) => (e) => {
    setNewReminder({
      ...newReminder,
      [name]: e.target.value,
    });
  };

  const exitTheForm = () => {
    setNewReminder(createEmptyReminder);
    setModalOn(false);
  };

  const saveOrAddReminder = () => {
    if (newReminder._id === "") {
      const reminderContentToAdd = { ...newReminder };
      delete reminderContentToAdd._id;
      addRecord({
        data: reminderContentToAdd,
        url: remindersGeneralLink(),
      });
    } else {
      updateRecord({
        from: "current",
        url: reminderWithIDLink(newReminder._id),
        data: newReminder,
      });
    }
    setNewReminder(createEmptyReminder);
    setModalOn(false);
  };

  const setReminderDate = (remindedAt) => {
    setNewReminder({
      ...newReminder,
      remindedAt: new Date(remindedAt),
    });
  };

  const handleRepeatChange = (e) => {
    setNewReminder((oldInfo) => {
      return {
        ...oldInfo,
        repeat: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[800px] sm:w-[60%]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                {_id ? "Edit Reminder" : "New Reminder"}
              </h3>
              <CloseButton takeAction={() => exitTheForm()} />
            </div>
            {/*body*/}

            <form className="m-auto py-5 px-12 w-full">
              <label className="text-gray-600 font-medium">Title</label>
              <div className="flex">
                <input
                  className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700"
                  name="title"
                  value={title}
                  placeholder="Shopping List, etc."
                  autoFocus
                  onChange={handleChange("title")}
                />
                {favorite ? (
                  <AiFillStar
                    className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                    size={25}
                    onClick={() => handleFavoriteChange()}
                  />
                ) : (
                  <AiOutlineStar
                    className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                    size={25}
                    onClick={() => handleFavoriteChange()}
                  />
                )}
              </div>

              <label className="text-gray-600 font-medium block mt-4">
                Description
              </label>
              <textarea
                value={description}
                rows={5}
                className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700 resize-none"
                name="description"
                onChange={handleChange("description")}
              />
            </form>
            {/*Choose date for desktop*/}
            <div className="hidden md:flex flex-col px-12 text-gray-600 font-medium">
              <p>Remind At:</p>
              <DateTimePicker
                disableClock
                //minDate={new Date()}
                onChange={setReminderDate}
                value={remindedAt}
                name="remindedAt"
              />
            </div>

            {/* <div className="block px-12 mb-5 py-2">
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    defaultChecked={repeat}
                    onClick={handleRepeatChange}
                  />
                  <span className="ml-2">Repeated</span>
                </label>
              </div>
            </div> */}

            <div className="block px-12 mb-5 py-2">
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <span className="mr-3">Repeated: </span>
                  <select
                    id="repeat"
                    value={repeat}
                    onChange={handleRepeatChange}
                  >
                    <option value="none">None</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </label>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => exitTheForm()}
              >
                Close
              </button>
              <button
                className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={(e) => saveOrAddReminder()}
              >
                {_id ? "Save Reminder" : "Add Reminder"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
