import { PastReminderToggle } from "./components/past-reminders-list/PastReminderToggle";
import PersonalReminder from "./components/personal-reminders/PersonalReminder";

export const MainReminders = () => {
  return (
    <>
      <PersonalReminder />
      <PastReminderToggle />
    </>
  );
};
