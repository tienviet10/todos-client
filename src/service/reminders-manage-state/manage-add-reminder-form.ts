import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CREATE_EMPTY_REMINDER } from "../../shared/constant/config";
import {
  remindersGeneralLink,
  reminderWithIDLink,
} from "../../shared/service-link/url-link";
import { ManageAddReminderFormStateType } from "../../shared/types/ManageStateType";
import { Reminder } from "../../shared/types/Reminder";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

const createEmptyReminder: Reminder = CREATE_EMPTY_REMINDER;

export function useManageAddReminderFormState(): ManageAddReminderFormStateType {
  const { t } = useTranslation();

  //Send reminder to backend to save or edit reminder
  const { addRecord, updateRecord } = useContext(ReminderContext);

  //Hold reminder state in frontend ONLY before sending to the backend
  const { newReminder, setNewReminder, setModalOn } =
    useContext(ReminderModalContext);

  //Only for in-component manipulation for favorite entity
  const [favorite, setFavorite] = useState<boolean>(newReminder.favorite);

  const handleFavoriteChange = () => {
    setNewReminder({
      ...newReminder,
      favorite: !favorite,
    });
    setFavorite(!favorite);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewReminder({
      ...newReminder,
      [e.target.name]: e.target.value,
    });
  };

  const exitTheForm = () => {
    setNewReminder(createEmptyReminder);
    setModalOn(false);
  };

  const saveOrAddReminder = () => {
    if (newReminder._id === "") {
      const reminderContentToAdd: Reminder = {
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
        url: reminderWithIDLink(newReminder._id as string),
        data: newReminder,
      });
    }
    setNewReminder(createEmptyReminder);
    setModalOn(false);
  };

  const setReminderDate = (remindedAt: Date) => {
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
    t,
  };
}
