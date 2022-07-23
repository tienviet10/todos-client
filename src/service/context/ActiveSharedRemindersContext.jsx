import React, { createContext } from "react";
import { useRestOperationSharedReminder } from "../reminders-manage-request/shared-reminder";

const SharedReminderContext = createContext();

function SharedReminderProvider({ children }) {
  const {
    allSharedReminders,
    error,
    loading,
    discardSharedRecord,
    addSharedRecord,
    updateSharedRecord,
  } = useRestOperationSharedReminder();

  return (
    <SharedReminderContext.Provider
      value={{
        allSharedReminders,
        error,
        loading,
        discardSharedRecord,
        addSharedRecord,
        updateSharedRecord,
      }}
    >
      {children}
    </SharedReminderContext.Provider>
  );
}

export { SharedReminderContext, SharedReminderProvider };
