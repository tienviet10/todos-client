import React, { createContext } from "react";
import { useRestPastReminder } from "../reminders-manage-request/past-reminders";

const PastRemindersContext = createContext();

function PastReminderProvider({ children }) {
  const {
    pastReminders,
    error,
    loading,
    discardRecord,
    addRecordFromActive,
    setIsPastRemindersOn,
    isPastRemindersOn,
  } = useRestPastReminder();

  return (
    <PastRemindersContext.Provider
      value={{
        pastReminders,
        error,
        loading,
        discardRecord,
        addRecordFromActive,
        setIsPastRemindersOn,
        isPastRemindersOn,
      }}
    >
      {children}
    </PastRemindersContext.Provider>
  );
}

export { PastRemindersContext, PastReminderProvider };
