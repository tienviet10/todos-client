import React, { createContext } from "react";
import { useRestPastSharedReminder } from "../reminders-manage-request/past-shared-reminders";

const PastSharedRemindersContext = createContext();

function PastSharedReminderProvider({ children }) {
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
