import withUser from "../service/auth/withUser";
import { UserData } from "../shared/types/User";
import { ActiveSharedReminders } from "./components/active-shared-reminders-list/ActiveSharedReminders";
import { PastSharedRemindersToggle } from "./components/past-shared-reminders-list/PastSharedRemindersToggle";

const SharedReminders = ({ user }: { user: UserData }) => {
  return (
    <>
      <ActiveSharedReminders user={user} />
      <PastSharedRemindersToggle />
    </>
  );
};

export default withUser(SharedReminders);
