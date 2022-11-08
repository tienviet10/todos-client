import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { sharedReminderWithIDLink } from "../../shared/service-link/url-link";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ConfirmationContext } from "../context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { PastSharedRemindersContext } from "../context/PastSharedRemindersContext";

export function useManageDisplayDetailSharedRemindersState() {
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

  const execDeletion = (details) => {
    confirm({
      onSuccess:
        details.status === REMINDER_STATUS.ACTIVE
          ? () =>
              discardRecordActiveReminder(sharedReminderWithIDLink(details._id))
          : () =>
              discardRecordPastReminder(sharedReminderWithIDLink(details._id)),
    });

    setDetailOn(false);
  };

  const moveReminderToPast = (details) => {
    updateSharedRecord({
      from: "currentToPast",
      url: sharedReminderWithIDLink(details._id),
      data: { ...details, status: REMINDER_STATUS.INACTIVE },
    });
    setDetailOn(false);
  };

  const restoreReminder = (details) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateSharedRecord({
      from: "past",
      url: sharedReminderWithIDLink(details._id),
      data: { ...details, status: REMINDER_STATUS.ACTIVE },
      remindedAt:
        new Date(details._id) < yesterdayEndDate ? null : details.remindedAt,
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
