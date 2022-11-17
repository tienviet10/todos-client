import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { sharedReminderWithIDLink } from "../../shared/service-link/url-link";
import { ManageDisplayDetailSharedRemindersStateType } from "../../shared/types/ManageStateType";
import { SharedReminder } from "../../shared/types/Reminder";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastSharedRemindersContext } from "../context/PastSharedRemindersContext";

export function useManageDisplayDetailSharedRemindersState(): ManageDisplayDetailSharedRemindersStateType {
  const { t } = useTranslation();
  const {
    updateSharedRecord,
    discardSharedRecord: discardRecordActiveReminder,
  } = useContext(SharedReminderContext);
  const { discardRecord: discardRecordPastReminder } = useContext(
    PastSharedRemindersContext
  );

  const { sharedReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const { confirm } = useContext(ConfirmationContext);

  const execDeletion = (details: SharedReminder) => {
    confirm({
      onSuccess:
        details.status === REMINDER_STATUS.ACTIVE
          ? () =>
              discardRecordActiveReminder(
                sharedReminderWithIDLink(details?._id as string)
              )
          : () =>
              discardRecordPastReminder(
                sharedReminderWithIDLink(details?._id as string)
              ),
    });

    setDetailOn(false);
  };

  const moveReminderToPast = (details: SharedReminder) => {
    updateSharedRecord({
      from: "currentToPast",
      url: sharedReminderWithIDLink(details?._id as string),
      data: { ...details, status: REMINDER_STATUS.INACTIVE },
    });
    setDetailOn(false);
  };

  const restoreReminder = (details: SharedReminder) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateSharedRecord({
      from: "past",
      url: sharedReminderWithIDLink(details?._id as string),
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
    sharedReminderDetails,
    moveReminderToPast,
    restoreReminder,
    execDeletion,
    t,
  };
}

// import { useContext } from "react";
// import { sharedReminderWithIDLink } from "../../shared/service-link/url-link";
// import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
// import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
// import { PastSharedRemindersContext } from "../context/PastSharedRemindersContext";
// import { useManageDisplayDetails } from "./manage-display-details";

// export function useManageDisplayDetailSharedRemindersState() {
//   const {
//     updateSharedRecord,
//     discardSharedRecord: discardRecordActiveReminder,
//   } = useContext(SharedReminderContext);
//   const { discardRecord: discardRecordPastReminder } = useContext(
//     PastSharedRemindersContext
//   );

//   const { sharedReminderDetails, setDetailOn } = useContext(
//     DetailOfAReminderContext
//   );

//   const { execDeletion, moveReminderToPast, restoreReminder } =
//     useManageDisplayDetails(
//       updateSharedRecord,
//       discardRecordActiveReminder,
//       discardRecordPastReminder,
//       sharedReminderWithIDLink
//     );

//   return {
//     setDetailOn,
//     sharedReminderDetails,
//     moveReminderToPast,
//     restoreReminder,
//     execDeletion,
//   };
// }
