import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { reminderWithIDLink } from "../../shared/service-link/url-link";
import { ManageDisplayDetailRemindersStateType } from "../../shared/types/ManageStateType";
import { Reminder } from "../../shared/types/Reminder";
import { ReminderContext } from "../context/ActiveRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastRemindersContext } from "../context/PastRemindersContext";

export function useManageDisplayDetailRemindersState(): ManageDisplayDetailRemindersStateType {
  const { t } = useTranslation();
  const { updateRecord, discardRecord: discardRecordActiveReminder } =
    useContext(ReminderContext);
  const { discardRecord: discardRecordPastReminder } =
    useContext(PastRemindersContext);

  const { confirm } = useContext(ConfirmationContext);

  const { reminderDetails, setDetailOn } = useContext(DetailOfAReminderContext);

  const execDeletion = (details: Reminder) => {
    confirm({
      onSuccess:
        details.status === REMINDER_STATUS.ACTIVE
          ? () =>
              discardRecordActiveReminder(
                reminderWithIDLink(details?._id as string)
              )
          : () =>
              discardRecordPastReminder(
                reminderWithIDLink(details?._id as string)
              ),
    });

    setDetailOn(false);
  };

  const moveReminderToPast = (details: Reminder) => {
    updateRecord({
      from: "currentToPast",
      url: reminderWithIDLink(details?._id as string),
      data: { ...details, status: REMINDER_STATUS.INACTIVE },
    });
    setDetailOn(false);
  };

  const restoreReminder = (details: Reminder) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateRecord({
      from: "past",
      url: reminderWithIDLink(details?._id as string),
      data: {
        ...details,
        status: REMINDER_STATUS.ACTIVE,
        remindedAt:
          new Date(details?._id as string) < yesterdayEndDate
            ? null
            : details.remindedAt,
      },
    });
    setDetailOn(false);
  };

  return {
    setDetailOn,
    reminderDetails,
    moveReminderToPast,
    restoreReminder,
    execDeletion,
    t,
  };
}

// import { useContext } from "react";
// import { reminderWithIDLink } from "../../shared/service-link/url-link";
// import { ReminderContext } from "../context/ActiveRemindersContext";
// import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
// import { PastRemindersContext } from "../context/PastRemindersContext";
// import { useManageDisplayDetails } from "./manage-display-details";

// export function useManageDisplayDetailRemindersState() {
//   const { updateRecord, discardRecord: discardRecordActiveReminder } =
//     useContext(ReminderContext);
//   const { discardRecord: discardRecordPastReminder } =
//     useContext(PastRemindersContext);

//   const { reminderDetails, sharedReminderDetails, setDetailOn } = useContext(
//     DetailOfAReminderContext
//   );

//   const { execDeletion, moveReminderToPast, restoreReminder } =
//     useManageDisplayDetails(
//       updateRecord,
//       discardRecordActiveReminder,
//       discardRecordPastReminder,
//       reminderWithIDLink
//     );

//   return {
//     setDetailOn,
//     reminderDetails,
//     sharedReminderDetails,
//     moveReminderToPast,
//     restoreReminder,
//     execDeletion,
//   };
// }
