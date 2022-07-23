import { useContext } from "react";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { reminderWithIDLink } from "../../shared/service-link/url-link";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastRemindersContext } from "../context/PastRemindersContext";

export function useManageDisplayDetailRemindersState() {
  const { updateRecord, discardRecord: discardRecordActiveReminder } =
    useContext(ReminderContext);
  const { discardRecord: discardRecordPastReminder } =
    useContext(PastRemindersContext);
  const { reminderDetails, setDetailOn } = useContext(DetailOfAReminderContext);
  const { title, description, remindedAt } = reminderDetails;
  const { confirm } = useContext(ConfirmationContext);

  const execDeletion = (reminderDetails) => {
    confirm({
      onSuccess:
        reminderDetails.status === REMINDER_STATUS.ACTIVE
          ? () =>
              discardRecordActiveReminder(
                reminderWithIDLink(reminderDetails._id)
              )
          : () =>
              discardRecordPastReminder(
                reminderWithIDLink(reminderDetails._id)
              ),
    });

    setDetailOn(false);
  };

  const moveReminderToPast = (reminderDetails) => {
    updateRecord({
      from: "currentToPast",
      url: reminderWithIDLink(reminderDetails._id),
      data: { ...reminderDetails, status: REMINDER_STATUS.INACTIVE },
    });
    setDetailOn(false);
  };

  const restoreReminder = (reminderDetails) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateRecord({
      from: "past",
      url: reminderWithIDLink(reminderDetails._id),
      data: { ...reminderDetails, status: REMINDER_STATUS.ACTIVE },
      remindedAt:
        new Date(reminderDetails._id) < yesterdayEndDate
          ? null
          : reminderDetails.remindedAt,
    });
    setDetailOn(false);
  };

  return {
    setDetailOn,
    title,
    description,
    remindedAt,
    reminderDetails,
    moveReminderToPast,
    restoreReminder,
    execDeletion,
  };
}
