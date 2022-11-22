import React, { createContext } from "react";
import { RestPastSharedReminderType } from "../../shared/types/service/ManageRequest";

import { useRestPastSharedReminder } from "../reminders-manage-request/past-shared-reminders";

const PastSharedRemindersContext = createContext<RestPastSharedReminderType>(
  {} as RestPastSharedReminderType
);

function PastSharedReminderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    pastSharedReminders,
    error,
    loading,
    discardRecord,
    // addRecordFromActive,
    setIsPastSharedRemindersOn,
    isPastSharedRemindersOn,
  } = useRestPastSharedReminder();

  return (
    <PastSharedRemindersContext.Provider
      value={{
        pastSharedReminders,
        error,
        loading,
        discardRecord,
        //addRecordFromActive,
        setIsPastSharedRemindersOn,
        isPastSharedRemindersOn,
      }}
    >
      {children}
    </PastSharedRemindersContext.Provider>
  );
}

export { PastSharedRemindersContext, PastSharedReminderProvider };
