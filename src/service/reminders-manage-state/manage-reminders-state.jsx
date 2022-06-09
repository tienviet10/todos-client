import { useContext } from "react";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { reminderWithIDLink } from "../../shared/service-link/url-link";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { ModalContext } from "../context/ModalContext";
import { ReminderContext } from "../context/ReminderContext";

export function useManageRemindersState() {
  const { updateRecord, discardRecord: discardRecordActiveReminder } =
    useContext(ReminderContext);
  const { setModalOn, setNewReminder } = useContext(ModalContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const { confirm } = useContext(ConfirmationContext);

  const editFavorite = (item, fav) => {
    updateRecord({
      from: "current",
      url: reminderWithIDLink(item._id),
      data: { ...item, favorite: fav },
    });
  };

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    confirm({
      onSuccess: () => discardRecordActiveReminder(reminderWithIDLink(itemId)),
    });
  };

  const moveReminderToPast = (item) => {
    updateRecord({
      from: "currentToPast",
      url: reminderWithIDLink(item._id),
      data: { ...item, status: REMINDER_STATUS.INACTIVE },
    });
  };

  const editReminder = (item) => {
    setNewReminder({
      title: item.title,
      repeat: item.repeat,
      description: item.description,
      color: item.color,
      status: REMINDER_STATUS.ACTIVE,
      favorite: item.favorite,
      remindedAt: item.remindedAt ? new Date(item.remindedAt) : null,
      _id: item._id,
    });
    setModalOn(true);
  };

  const saveNewChosenColor = (color, item) => {
    updateRecord({
      from: "current",
      url: reminderWithIDLink(item._id),
      data: { ...item, color: color },
    });
  };

  return {
    editFavorite,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
  };
}
