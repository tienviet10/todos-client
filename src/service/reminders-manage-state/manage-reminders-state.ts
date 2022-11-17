import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { reminderWithIDLink } from "../../shared/service-link/url-link";
import { ManageRemindersStateType } from "../../shared/types/service/ManageStateType";
import { Reminder } from "../../shared/types/service/Reminder";
import { GreetingImageType } from "../../shared/types/service/User";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

export function useManageRemindersState(): ManageRemindersStateType {
  const { t } = useTranslation();
  const {
    allReminders,
    updateRecord,
    discardRecord: discardRecordActiveReminder,
    loading: loadingReminders,
    error: errorGetReminders,
  } = useContext(ReminderContext);

  const { setModalOn, setNewReminder } = useContext(ReminderModalContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const { confirm } = useContext(ConfirmationContext);

  const [sayHi, setSayHi] = useState<GreetingImageType>({
    statement: t("day"),
    image: "images/afternoon.png",
  });

  useEffect(() => {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12 && curHr > 3) {
      setSayHi({
        statement: t("morning"),
        image: "images/morning.png",
      });
    } else if (curHr < 18 && curHr > 12) {
      setSayHi({
        statement: t("afternoon"),
        image: "images/afternoon.png",
      });
    } else {
      setSayHi({
        statement: t("evening"),
        image: "images/evening.png",
      });
    }
  }, [t]);

  const editFavorite = (item: Reminder, fav: boolean) => {
    updateRecord({
      from: "current",
      url: reminderWithIDLink(item._id as string),
      data: { ...item, favorite: fav },
    });
  };

  const handleDetailsScreen = (item: Reminder) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId: string) => {
    confirm({
      onSuccess: () => discardRecordActiveReminder(reminderWithIDLink(itemId)),
    });
  };

  const moveReminderToPast = (item: Reminder) => {
    updateRecord({
      from: "currentToPast",
      url: reminderWithIDLink(item._id as string),
      data: { ...item, status: REMINDER_STATUS.INACTIVE },
    });
  };

  const editReminder = (item: Reminder) => {
    setNewReminder({
      ...item,
      status: REMINDER_STATUS.ACTIVE,
      remindedAt: item.remindedAt ? new Date(item.remindedAt) : null,
    });
    setModalOn(true);
  };

  const saveNewChosenColor = (color: string, item: Reminder) => {
    updateRecord({
      from: "current",
      url: reminderWithIDLink(item._id as string),
      data: { ...item, color: color },
    });
  };

  return {
    allReminders,
    loadingReminders,
    errorGetReminders,
    editFavorite,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
    sayHi,
    t,
  };
}
