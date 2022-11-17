import React, { createContext } from "react";
import { RestPastReminderType } from "../../shared/types/ContextType";
import { useRestPastReminder } from "../reminders-manage-request/past-reminders";

const PastRemindersContext = createContext<RestPastReminderType>(
  {} as RestPastReminderType
);

function PastReminderProvider({ children }: { children: React.ReactNode }) {
  const {
    pastReminders,
    error,
    loading,
    discardRecord,
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
        setIsPastRemindersOn,
        isPastRemindersOn,
      }}
    >
      {children}
    </PastRemindersContext.Provider>
  );
}

export { PastRemindersContext, PastReminderProvider };
