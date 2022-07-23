import { createContext, useState } from "react";
import {
  CREATE_EMPTY_REMINDER,
  CREATE_EMPTY_SHARED_REMINDER,
} from "../../shared/constant/config";

const ReminderModalContext = createContext();

function ReminderModalProvider({ children }) {
  const [modalOn, setModalOn] = useState(false);
  const [newReminder, setNewReminder] = useState(CREATE_EMPTY_REMINDER);
  const [newSharedReminder, setNewSharedReminder] = useState(
    CREATE_EMPTY_SHARED_REMINDER
  );
  return (
    <ReminderModalContext.Provider
      value={{
        modalOn,
        setModalOn,
        newReminder,
        setNewReminder,
        newSharedReminder,
        setNewSharedReminder,
      }}
    >
      {children}
    </ReminderModalContext.Provider>
  );
}

export { ReminderModalContext, ReminderModalProvider };
