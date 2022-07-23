import React from "react";
import withUser from "../service/auth/withUser";
import { ActiveSharedReminders } from "./components/active-shared-reminders-list/ActiveSharedReminders";
import { PastSharedRemindersToggle } from "./components/past-shared-reminders-list/PastSharedRemindersToggle";

const SharedReminders = ({ user }) => {
  return (
    <>
      <ActiveSharedReminders user={user} />
      <PastSharedRemindersToggle />
    </>
  );
};

export default withUser(SharedReminders);
