import { createContext } from "react";
import { RestOperationSharedReminder } from "../../shared/types/ContextType";
import { useRestOperationSharedReminder } from "../reminders-manage-request/shared-reminder";

const SharedReminderContext = createContext<RestOperationSharedReminder>({
  allSharedReminders: [],
  error: "",
  loading: false,
  discardSharedRecord: () => {},
  addSharedRecord: () => {},
  updateSharedRecord: () => {},
});

function SharedReminderProvider({ children }: { children: React.ReactNode }) {
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
