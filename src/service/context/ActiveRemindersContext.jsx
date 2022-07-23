import React, { createContext } from "react";
import { useRestOperationReminder } from "../reminders-manage-request/reminders";

const ReminderContext = createContext();

function ReminderProvider({ children }) {
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
