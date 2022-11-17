import withUser from "../service/auth/withUser";
import { UserDataType } from "../shared/types/service/User";
import { ActiveSharedReminders } from "./components/active-shared-reminders-list/ActiveSharedReminders";
import { PastSharedRemindersToggle } from "./components/past-shared-reminders-list/PastSharedRemindersToggle";

const SharedReminders:React.FC<UserDataType> = ({ user }) => {
  return (
    <>
      <ActiveSharedReminders user={user} />
      <PastSharedRemindersToggle />
    </>
  );
};

export default withUser(SharedReminders);
