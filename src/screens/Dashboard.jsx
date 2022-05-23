import React, { useContext } from "react";
import withUser from "../service/auth/withUser";
import { EmptyListDisplay } from "../components/dashboard/EmptyListDisplay";

import Loader from "../components/shared/Loader";
import { ReminderContext } from "../service/context/ReminderContext";
import { DisplayReminderList } from "../components/reminders-list/DisplayReminderList";

const Dashboard = () => {
  const {
    allReminders,
    loading: loadingReminders,
    error: errorGetReminders,
  } = useContext(ReminderContext);

  if (loadingReminders)
    return (
      <div className="py-20">
        <Loader />
      </div>
    );

  if (errorGetReminders) return <div>Something went wrong...</div>;

  return (
    <div>
      {allReminders && allReminders.length === 0 ? (
        <EmptyListDisplay />
      ) : (
        <>
          <DisplayReminderList />
        </>
      )}
    </div>
  );
};

export default withUser(Dashboard);
