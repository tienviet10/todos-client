import React, { useContext } from "react";
import withUser from "../service/auth/withUser";
import { ReminderContext } from "../service/context/ReminderContext";
import { useManageRemindersState } from "../service/reminders-manage-state/manage-reminders-state";
import { FavoriteReminders } from "../shared/components/active-reminders-list/FavoriteReminders";
import { MainReminders } from "../shared/components/active-reminders-list/MainReminders";
import { EmptyListDisplay } from "../shared/components/dashboard/EmptyListDisplay";
import Loader from "../shared/components/general/Loader";

const Dashboard = () => {
  const {
    allReminders,
    loading: loadingReminders,
    error: errorGetReminders,
  } = useContext(ReminderContext);

  const {
    editFavorite,
    handleDetailsScreen,
    execDeletion,
    moveReminderToPast,
    editReminder,
    saveNewChosenColor,
  } = useManageRemindersState();

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
/////--------------------------------------------------------------------------------------

// import React, { useContext } from "react";
// import withUser from "../service/auth/withUser";
// import { ReminderContext } from "../service/context/ReminderContext";
// import { EmptyListDisplay } from "../shared/components/dashboard/EmptyListDisplay";
// import Loader from "../shared/components/general/Loader";
// import { FavoriteReminders } from "../shared/components/reminders-list/FavoriteReminders";
// import { MainReminders } from "../shared/components/reminders-list/MainReminders";

// const Dashboard = () => {
//   const {
//     allReminders,
//     loading: loadingReminders,
//     error: errorGetReminders,
//   } = useContext(ReminderContext);

//   if (loadingReminders)
//     return (
//       <div className="py-20">
//         <Loader />
//       </div>
//     );

//   if (errorGetReminders) return <div>Something went wrong...</div>;

//   const mainRemindersList = allReminders.filter((item) => !item.favorite);
//   const favRemindersList = allReminders.filter((item) => item.favorite);

//   return (
//     <div>
//       {allReminders && allReminders.length === 0 ? (
//         <EmptyListDisplay />
//       ) : (
//         <>
//           <FavoriteReminders favRemindersList={favRemindersList} />
//           <MainReminders mainRemindersList={mainRemindersList} />
//         </>
//       )}
//     </div>
//   );
// };

// export default withUser(Dashboard);

/////-------------------------------------------------------------------------------------------

// import React, { useContext } from "react";
// import withUser from "../service/auth/withUser";
// import { ReminderContext } from "../service/context/ReminderContext";
// import { EmptyListDisplay } from "../shared/components/dashboard/EmptyListDisplay";
// import Loader from "../shared/components/general/Loader";
// import { DisplayReminderList } from "../shared/components/reminders-list/DisplayReminderList";

// const Dashboard = () => {
//   const {
//     allReminders,
//     loading: loadingReminders,
//     error: errorGetReminders,
//   } = useContext(ReminderContext);

//   if (loadingReminders)
//     return (
//       <div className="py-20">
//         <Loader />
//       </div>
//     );

//   if (errorGetReminders) return <div>Something went wrong...</div>;

//   return (
//     <div>
//       {allReminders && allReminders.length === 0 ? (
//         <EmptyListDisplay />
//       ) : (
//         <>
//           <DisplayReminderList />
//         </>
//       )}
//     </div>
//   );
// };

// export default withUser(Dashboard);
