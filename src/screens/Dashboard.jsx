import { useContext } from "react";
import withUser from "../service/auth/withUser";
import { ReminderContext } from "../service/context/ReminderContext";
import { useManageRemindersState } from "../service/reminders-manage-state/manage-reminders-state";
import Loader from "../shared/components/Loader";
import { FavoriteReminders } from "./components/active-reminders-list/FavoriteReminders";
import { MainReminders } from "./components/active-reminders-list/MainReminders";
import { EmptyListDisplay } from "./components/dashboard/EmptyListDisplay";

import { useState, useEffect } from "react";

const Dashboard = ({ user }) => {
  const {
    allReminders,
    loading: loadingReminders,
    error: errorGetReminders,
  } = useContext(ReminderContext);
  //Manage all operation of the active reminder
  const {
    editFavorite,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
  } = useManageRemindersState();

  // const [sayHi, setSayHi] = useState("Good day, ");
  // const [imageForTheTime, setImageForTheTime] = useState(
  //   "images/afternoon.png"
  // );

  const [sayHi, setSayHi] = useState({
    statement: "Good day, ",
    image: "images/afternoon.png",
  });

  useEffect(() => {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      setSayHi({
        statement: "Good morning, ",
        image: "images/morning.png",
      });
    } else if (curHr < 18) {
      setSayHi({
        statement: "Good afternoon, ",
        image: "images/afternoon.png",
      });
    } else {
      setSayHi({
        statement: "Good evening, ",
        image: "images/evening.png",
      });
    }
  }, []);

  if (loadingReminders)
    return (
      <div className="py-20">
        <Loader />
      </div>
    );

  if (errorGetReminders) return <div>Something went wrong...</div>;

  const mainRemindersList = allReminders.filter((item) => !item.favorite);
  const favRemindersList = allReminders.filter((item) => item.favorite);

  return (
    <div>
      {allReminders && allReminders.length === 0 ? (
        <EmptyListDisplay />
      ) : (
        <>
          {user.user && user.user.givenName && user.user.givenName !== "" && (
            <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2 justify-center items-center text-2xl">
              <div>
                {sayHi.statement} {user.user.givenName}
              </div>
              <div>
                <img className="w-9 h-9 ml-4" src={sayHi.image} alt=""></img>
              </div>
            </div>
          )}
          <FavoriteReminders
            remindersList={favRemindersList}
            moveReminderToPast={moveReminderToPast}
            saveNewChosenColor={saveNewChosenColor}
            handleDetailsScreen={handleDetailsScreen}
            editFavorite={editFavorite}
            editReminder={editReminder}
            execDeletion={execDeletion}
          />
          <MainReminders
            remindersList={mainRemindersList}
            moveReminderToPast={moveReminderToPast}
            saveNewChosenColor={saveNewChosenColor}
            handleDetailsScreen={handleDetailsScreen}
            editFavorite={editFavorite}
            editReminder={editReminder}
            execDeletion={execDeletion}
          />
        </>
      )}
    </div>
  );
};

export default withUser(Dashboard);
