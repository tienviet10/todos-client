import React, { createContext } from "react";
import { useRestPastReminder } from "../reminders/pastreminders";

const PastRemindersContext = createContext();

function PastReminderProvider({ children }) {
  const { pastReminders, error, loading, discardRecord, addRecordFromActive } =
    useRestPastReminder();

  return (
    <PastRemindersContext.Provider
      value={{
        pastReminders,
        error,
        loading,
        discardRecord,
        addRecordFromActive,
      }}
    >
      {children}
    </PastRemindersContext.Provider>
  );
}

export { PastRemindersContext, PastReminderProvider };
