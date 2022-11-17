import { useManageSharedRemindersState } from "../../../service/reminders-manage-state/manage-shared-reminders-state";
import Loader from "../../../shared/components/loading-spinner/CenterLoader";
import { UserData } from "../../../shared/types/User";
import { EmptyListDisplay } from "../personal-reminders/EmptyListDisplay";
import { SharedRemindersList } from "./SheredRemindersList";

export const ActiveSharedReminders = ({ user }: { user: UserData }) => {
  const {
    allSharedReminders,
    loadingSharedReminders,
    errorGetSharedReminders,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
    sayHi,
    t,
  } = useManageSharedRemindersState();

  if (loadingSharedReminders)
    return (
      <div className="py-20">
        <Loader />
      </div>
    );

  if (errorGetSharedReminders)
    return <div className="text-white">Something went wrong...</div>;

  return (
    <div>
      {allSharedReminders && allSharedReminders.length === 0 ? (
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
          {/* Main List */}
          <SharedRemindersList
            remindersList={allSharedReminders}
            moveReminderToPast={moveReminderToPast}
            saveNewChosenColor={saveNewChosenColor}
            handleDetailsScreen={handleDetailsScreen}
            editReminder={editReminder}
            execDeletion={execDeletion}
            title={t("reminders")}
            user={user}
          />
        </>
      )}
    </div>
  );
};
