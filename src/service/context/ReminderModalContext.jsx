import { createContext, useState } from "react";
import {
  CREATE_EMPTY_REMINDER,
  CREATE_EMPTY_SHARED_REMINDER,
  NAV_TABS,
} from "../../shared/constant/config";

const ReminderModalContext = createContext();

function ReminderModalProvider({ children }) {
  // selectedNavTab for highlight the visible tab that user chosen both from desktop and mobile view
  const [selectedNavTab, setNavTab] = useState(NAV_TABS[0].name);

  // Turn on the Form to add a new reminder for either personal or shared reminders
  const [modalOn, setModalOnMain] = useState(false);

  const [newReminder, setNewReminder] = useState(CREATE_EMPTY_REMINDER);
  const [newSharedReminder, setNewSharedReminder] = useState(
    CREATE_EMPTY_SHARED_REMINDER
  );

  // Ensure only Reminder tab or Share tab are able to add a new reminder
  const setModalOn = (toggleStatus) => {
    if (
      toggleStatus &&
      (selectedNavTab === NAV_TABS[0].name ||
        selectedNavTab === NAV_TABS[1].name)
    ) {
      setModalOnMain(true);
    } else {
      setModalOnMain(false);
    }
  };

  return (
    <ReminderModalContext.Provider
      value={{
        modalOn,
        setModalOn,
        newReminder,
        setNewReminder,
        newSharedReminder,
        setNewSharedReminder,
        selectedNavTab,
        setNavTab,
      }}
    >
      {children}
    </ReminderModalContext.Provider>
  );
}

export { ReminderModalContext, ReminderModalProvider };
