import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { sharedReminderWithIDLink } from "../../shared/service-link/url-link";
import { ManageSharedRemindersStateType } from "../../shared/types/service/ManageStateType";
import { SharedReminder } from "../../shared/types/service/Reminder";
import { GreetingImageType } from "../../shared/types/service/User";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

export function useManageSharedRemindersState(): ManageSharedRemindersStateType {
  const { t } = useTranslation();

  const {
    allSharedReminders,
    updateSharedRecord,
    discardSharedRecord: discardSharedRecordActiveReminder,
    loading: loadingSharedReminders,
    error: errorGetSharedReminders,
  } = useContext(SharedReminderContext);

  const { setModalOn, setNewSharedReminder } = useContext(ReminderModalContext);

  const { setSharedReminderDetails, setDetailOn } = useContext(
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

  const handleDetailsScreen = (item: SharedReminder) => {
    setSharedReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId: string) => {
    confirm({
      onSuccess: () =>
        discardSharedRecordActiveReminder(sharedReminderWithIDLink(itemId)),
    });
  };

  const moveReminderToPast = (item: SharedReminder) => {
    updateSharedRecord({
      from: "currentToPast",
      url: sharedReminderWithIDLink(item._id as string),
      data: { ...item, status: REMINDER_STATUS.INACTIVE },
    });
  };

  const editReminder = (item: SharedReminder) => {
    setNewSharedReminder({
      ...item,
      status: REMINDER_STATUS.ACTIVE,
      remindedAt: item.remindedAt ? new Date(item.remindedAt) : null,
    });
    setModalOn(true);
  };

  const saveNewChosenColor = (color: string, item: SharedReminder) => {
    updateSharedRecord({
      from: "current",
      url: sharedReminderWithIDLink(item._id as string),
      data: { ...item, color: color },
    });
  };

  return {
    allSharedReminders,
    loadingSharedReminders,
    errorGetSharedReminders,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
    sayHi,
    t,
  };
}
