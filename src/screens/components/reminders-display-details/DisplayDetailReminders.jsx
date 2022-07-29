import React from "react";
import { DetailsForReminders } from "./reminders/DetailsForReminders";
import { DetailsForSharedReminders } from "./shared-reminders/DetailsForSharedReminders";

export const DetailOfAReminderWindow = ({ selectedTab }) => {
  return (
    <>
      {selectedTab === "reminder" && <DetailsForReminders />}
      {selectedTab === "share" && <DetailsForSharedReminders />}
    </>
  );
};

// import React from "react";
// import { useManageDisplayDetailRemindersState } from "../../../service/reminders-manage-state/manage-display-detail-reminders";
// import { DetailsForReminders } from "./reminders/DetailsForReminders";
// import { DetailsForSharedReminders } from "./shared-reminders/DetailsForSharedReminders";

// export const DetailOfAReminderWindow = ({ selectedTab }) => {
//   const {
//     setDetailOn,
//     reminderDetails,
//     sharedReminderDetails,
//     moveReminderToPast,
//     restoreReminder,
//     execDeletion,
//   } = useManageDisplayDetailRemindersState();

//   return (
//     <>
//       {selectedTab === "reminder" && (
//         <DetailsForReminders
//           setDetailOn={setDetailOn}
//           reminderDetails={reminderDetails}
//           moveReminderToPast={moveReminderToPast}
//           restoreReminder={restoreReminder}
//           execDeletion={execDeletion}
//         />
//       )}
//       {selectedTab === "share" && (
//         <DetailsForSharedReminders
//           setDetailOn={setDetailOn}
//           sharedReminderDetails={sharedReminderDetails}
//           moveReminderToPast={moveReminderToPast}
//           restoreReminder={restoreReminder}
//           execDeletion={execDeletion}
//         />
//       )}
//     </>
//   );
// };
