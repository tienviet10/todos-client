import React, { createContext } from "react";
import { useRestOperationReminder } from "../reminders/reminders";

const ReminderContext = createContext();

function ReminderProvider({ children }) {
  const {
    reminders,
    favoriteReminders,
    error,
    loading,
    discardRecord,
    //updateStatusRecord,
    addRecord,
    updateRecord,
  } = useRestOperationReminder();

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        favoriteReminders,
        error,
        loading,
        discardRecord,
        //updateStatusRecord,
        addRecord,
        updateRecord,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export { ReminderContext, ReminderProvider };
