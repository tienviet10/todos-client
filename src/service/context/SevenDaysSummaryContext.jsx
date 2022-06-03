import React, { createContext, useState } from "react";
import { getSevenRemindersSummary } from "../../shared/service/url-link";
import { useRQGetARecordPause } from "../reminders/rest-request";

const SevenDaysSummaryContext = createContext();

function SevenDaysSummaryProvider({ children }) {
  const [sevenDaysReminders, setSevenDaysReminders] = useState([]);
  const [isSummaryOn, setIsSummaryOn] = useState(false);
  const [error, setError] = useState(null);

  const { refetch: refetchSevenDaysSummary } = useRQGetARecordPause(
    "sevenRemindersSummary",
    getSevenRemindersSummary(),
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);

      if (data.data !== undefined) {
        console.log(data.data);
        setSevenDaysReminders(data.data);
        setIsSummaryOn(true);
      }
    },
    (data) => setError(data)
  );

  return (
    <SevenDaysSummaryContext.Provider
      value={{
        isSummaryOn,
        setIsSummaryOn,
        sevenDaysReminders,
        error,
        refetchSevenDaysSummary,
      }}
    >
      {children}
    </SevenDaysSummaryContext.Provider>
  );
}

export { SevenDaysSummaryContext, SevenDaysSummaryProvider };

///-------------------------------------------------------------------------
// import React, { createContext, useState } from "react";
// import { getLocalStorage } from "../auth/auth";
// import { getRequestWithToken } from "../reminders/rest-request";

// const SevenDaysSummaryContext = createContext();

// function SevenDaysSummaryProvider({ children }) {
//   const [isSummaryOn, setIsSummaryOn] = useState(false);
//   const [sevenDaysReminders, setSevenDaysReminders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   function getSevenDaysReminders() {
//     setLoading(true);
//     async function execFunction() {
//       try {
//         //Call token outside return empty when just sign in
//         const token = getLocalStorage();
//         const response = await getRequestWithToken(
//           `/v1/reminders/seven-days-reminders`,
//           token
//         );
//         if (response.status) {
//           setSevenDaysReminders(response.data);
//           setIsSummaryOn(true);
//         } else {
//           setError("Error fetching a reminder from notification");
//           throw new Error("Fetch request error");
//         }
//       } catch (error) {
//         setError(error);
//       }
//     }
//     execFunction();
//     setLoading(false);
//   }

//   return (
//     <SevenDaysSummaryContext.Provider
//       value={{
//         isSummaryOn,
//         setIsSummaryOn,
//         sevenDaysReminders,
//         getSevenDaysReminders,
//         error,
//         loading,
//       }}
//     >
//       {children}
//     </SevenDaysSummaryContext.Provider>
//   );
// }

// export { SevenDaysSummaryContext, SevenDaysSummaryProvider };
