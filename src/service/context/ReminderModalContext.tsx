import { createContext, useState } from "react";
import {
  CREATE_EMPTY_REMINDER,
  CREATE_EMPTY_SHARED_REMINDER,
  NAV_TABS
} from "../../shared/constant/config";
import { ReminderModalContextType } from "../../shared/types/service/ContextType";
import { Reminder, SharedReminder } from "../../shared/types/service/Reminder";

const ReminderModalContext = createContext<ReminderModalContextType>(
  {} as ReminderModalContextType
);

function ReminderModalProvider({ children }: { children: React.ReactNode }) {
  // selectedNavTab for highlight the visible tab that user chosen both from desktop and mobile view
  const [selectedNavTab, setNavTab] = useState<string>(NAV_TABS[0].name);

  // Turn on the Form to add a new reminder for either personal or shared reminders
  const [modalOn, setModalOnMain] = useState<boolean>(false);

  const [newReminder, setNewReminder] = useState<Reminder>(
    CREATE_EMPTY_REMINDER
  );
  const [newSharedReminder, setNewSharedReminder] = useState<SharedReminder>(
    CREATE_EMPTY_SHARED_REMINDER
  );

  // Ensure only Reminder tab or Share tab are able to add a new reminder
  const setModalOn = (toggleStatus: boolean) => {
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
