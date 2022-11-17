import withUser from "../../../service/auth/withUser";
import { useManageRemindersState } from "../../../service/reminders-manage-state/manage-reminders-state";
import Loader from "../../../shared/components/loading-spinner/CenterLoader";
import { UserData } from "../../../shared/types/User";
import { RemindersList } from "../active-reminders-list/RemindersList";
import { EmptyListDisplay } from "./EmptyListDisplay";

const PersonalReminder = ({ user }: { user: UserData }) => {
  //Manage all operation of the active reminder
  const {
    allReminders,
    loadingReminders,
    errorGetReminders,
    editFavorite,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
    sayHi,
    t,
  } = useManageRemindersState();

  if (loadingReminders)
    return (
      <div className="py-20">
        <Loader />
      </div>
    );

  if (errorGetReminders)
    return <div className="text-white">Something went wrong...</div>;

  const mainRemindersList = allReminders.filter((item) => !item.favorite);
  const favRemindersList = allReminders.filter((item) => item.favorite);

  return (
    <div>
      {allReminders && allReminders.length === 0 ? (
        <EmptyListDisplay />
      ) : (
        <>
          {user.user && user.user.username && user.user.username !== "" && (
            <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2 justify-center items-center text-2xl text-white">
              <div>
                {sayHi.statement} {user.user.username}
              </div>
              <div>
                <img className="w-9 h-9 ml-4" src={sayHi.image} alt=""></img>
              </div>
            </div>
          )}
          {/* Favorite List */}
          <RemindersList
            remindersList={favRemindersList}
            moveReminderToPast={moveReminderToPast}
            saveNewChosenColor={saveNewChosenColor}
            handleDetailsScreen={handleDetailsScreen}
            editFavorite={editFavorite}
            editReminder={editReminder}
            execDeletion={execDeletion}
            title={t("favorite")}
          />
          {/* Main List */}
          <RemindersList
            remindersList={mainRemindersList}
            moveReminderToPast={moveReminderToPast}
            saveNewChosenColor={saveNewChosenColor}
            handleDetailsScreen={handleDetailsScreen}
            editFavorite={editFavorite}
            editReminder={editReminder}
            execDeletion={execDeletion}
            title={t("reminders")}
          />
        </>
      )}
    </div>
  );
};

export default withUser(PersonalReminder);
