import { DetailsForReminders } from "./reminders/DetailsForReminders";
import { DetailsForSharedReminders } from "./shared-reminders/DetailsForSharedReminders";

export const DetailOfAReminderWindow = ({
  selectedTab,
}: {
  selectedTab: string;
}) => {
  return (
    <>
      {selectedTab === "reminder" && <DetailsForReminders />}
      {selectedTab === "share" && <DetailsForSharedReminders />}
    </>
  );
};
