import { useContext, useState } from "react";
import { CREATE_EMPTY_REMINDER } from "../../shared/constant/config";
import {
  remindersGeneralLink,
  reminderWithIDLink,
} from "../../shared/service-link/url-link";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

const createEmptyReminder = CREATE_EMPTY_REMINDER;

export function useManageAddReminderFormState() {
  //Send reminder to backend to save or edit reminder
  const { addRecord, updateRecord } = useContext(ReminderContext);

  //Hold reminder state in frontend ONLY before sending to the backend
  const { newReminder, setNewReminder, setModalOn } =
    useContext(ReminderModalContext);

  //Only for in-component manipulation for favorite entity
  const [favorite, setFavorite] = useState(newReminder.favorite);

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
      const reminderContentToAdd = {
        ...newReminder,
      };
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

  return {
    newReminder,
    exitTheForm,
    handleChange,
    favorite,
    handleFavoriteChange,
    setReminderDate,
    saveOrAddReminder,
  };
}
