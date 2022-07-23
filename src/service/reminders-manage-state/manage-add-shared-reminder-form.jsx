import { useContext } from "react";
import { CREATE_EMPTY_SHARED_REMINDER } from "../../shared/constant/config";
import {
  sharedRemindersGeneralLink,
  sharedReminderWithIDLink,
} from "../../shared/service-link/url-link";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

const createEmptySharedReminder = CREATE_EMPTY_SHARED_REMINDER;

export function useManageAddSharedReminderFormState() {
  //Send reminder to backend to save or edit reminder
  const { addSharedRecord, updateSharedRecord } = useContext(
    SharedReminderContext
  );

  const { newSharedReminder, setNewSharedReminder, setModalOn } =
    useContext(ReminderModalContext);

  const exitTheForm = () => {
    setNewSharedReminder(createEmptySharedReminder);
    setModalOn(false);
  };

  const handleChange = (name) => (e) => {
    setNewSharedReminder({
      ...newSharedReminder,
      [name]: e.target.value,
    });
  };

  const setReminderDate = (remindedAt) => {
    setNewSharedReminder({
      ...newSharedReminder,
      remindedAt: new Date(remindedAt),
    });
  };

  const saveOrAddReminder = () => {
    if (newSharedReminder._id === "") {
      const reminderContentToAdd = {
        ...newSharedReminder,
      };
      delete reminderContentToAdd._id;

      addSharedRecord({
        data: reminderContentToAdd,
        url: sharedRemindersGeneralLink(),
      });
    } else {
      updateSharedRecord({
        from: "current",
        url: sharedReminderWithIDLink(newSharedReminder._id),
        data: newSharedReminder,
      });
    }
    setNewSharedReminder(createEmptySharedReminder);
    setModalOn(false);
  };

  return {
    newSharedReminder,
    exitTheForm,
    handleChange,
    setReminderDate,
    saveOrAddReminder,
  };
}
