import { DetailOfAReminderWindowType } from "../../../shared/types/reminders-shared-reminders-components/RemindersComponents";
import { DetailsForReminders } from "./reminders/DetailsForReminders";
import { DetailsForSharedReminders } from "./shared-reminders/DetailsForSharedReminders";

export const DetailOfAReminderWindow:React.FC<DetailOfAReminderWindowType> = ({
  selectedTab,
}) => {
  return (
    <>
      {selectedTab === "reminder" && <DetailsForReminders />}
      {selectedTab === "share" && <DetailsForSharedReminders />}
    </>
  );
};
