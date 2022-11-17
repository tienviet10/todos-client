import React, { createContext } from "react";
import { ReminderContextType } from "../../shared/types/ContextType";
import { useRestOperationReminder } from "../reminders-manage-request/reminders";

const ReminderContext = createContext<ReminderContextType>(
  {} as ReminderContextType
);

function ReminderProvider({ children }: { children: React.ReactNode }) {
  const {
    allReminders,
    error,
    loading,
    discardRecord,
    addRecord,
    updateRecord,
  } = useRestOperationReminder();

  return (
    <ReminderContext.Provider
      value={{
        allReminders,
        error,
        loading,
        discardRecord,
        addRecord,
        updateRecord,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export { ReminderContext, ReminderProvider };
