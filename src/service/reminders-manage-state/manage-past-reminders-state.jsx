import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { reminderWithIDLink } from "../../shared/service-link/url-link";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastRemindersContext } from "../context/PastRemindersContext";

export function useManagePastRemindersState() {
  const { t } = useTranslation();
  const {
    pastReminders,
    error,
    loading,
    discardRecord: discardRecordPastReminder,
  } = useContext(PastRemindersContext);

  const { updateRecord } = useContext(ReminderContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const { confirm } = useContext(ConfirmationContext);

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    confirm({
      onSuccess: () => discardRecordPastReminder(reminderWithIDLink(itemId)),
    });
  };

  const restorePastReminder = (item) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateRecord({
      from: "past",
      url: reminderWithIDLink(item._id),
      data: {
        ...item,
        status: REMINDER_STATUS.ACTIVE,
        remindedAt:
          new Date(item.remindedAt) < yesterdayEndDate ? null : item.remindedAt,
      },
    });
  };

  return {
    pastReminders,
    error,
    loading,
    restorePastReminder,
    handleDetailsScreen,
    execDeletion,
    t,
  };
}
