import { NAV_TABS } from "../../../shared/constant/config";
import { ReminderFormType } from "../../../shared/types/reminders-form/ReminderForm";
import { ReminderFormMain } from "./reminder-form/ReminderFormMain";
import { ReminderFormShared } from "./shared-form/ReminderFormShared";

export const ReminderForm:React.FC<ReminderFormType> = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab && selectedTab === NAV_TABS[0].name ? (
        <ReminderFormMain />
      ) : selectedTab === NAV_TABS[1].name ? (
        <ReminderFormShared />
      ) : (
        <div></div>
      )}
    </div>
  );
};
