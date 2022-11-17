import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { sharedReminderWithIDLink } from "../../shared/service-link/url-link";
import { ManageSharedPastRemindersStateType } from "../../shared/types/ManageStateType";
import { SharedReminder } from "../../shared/types/Reminder";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastSharedRemindersContext } from "../context/PastSharedRemindersContext";

export function useManageSharedPastRemindersState(): ManageSharedPastRemindersStateType {
  const { t } = useTranslation();
  const {
    pastSharedReminders,
    error,
    loading,
    discardRecord: discardRecordPastReminder,
  } = useContext(PastSharedRemindersContext);

  const { updateSharedRecord } = useContext(SharedReminderContext);
  const { setSharedReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const { confirm } = useContext(ConfirmationContext);

  const handleDetailsScreen = (item: SharedReminder) => {
    setSharedReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId: string) => {
    confirm({
      onSuccess: () =>
        discardRecordPastReminder(sharedReminderWithIDLink(itemId)),
    });
  };

  const restorePastReminder = (item: SharedReminder) => {
    const yesterdayEndDate: Date = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateSharedRecord({
      from: "past",
      url: sharedReminderWithIDLink(item._id as string),
      data: {
        ...item,
        status: REMINDER_STATUS.ACTIVE,
        remindedAt:
          new Date(item.remindedAt) < yesterdayEndDate ? null : item.remindedAt,
      },
    });
  };

  return {
    loading,
    error,
    pastSharedReminders,
    restorePastReminder,
    handleDetailsScreen,
    execDeletion,
    t,
  };
}
