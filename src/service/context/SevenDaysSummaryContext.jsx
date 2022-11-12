import { createContext, useState } from "react";
import { getSevenRemindersSummaryLink } from "../../shared/service-link/url-link";

import { useRQGetRecords } from "../reminders-manage-request/rest-request";

const SevenDaysSummaryContext = createContext();

function SevenDaysSummaryProvider({ children }) {
  const [sevenDaysReminders, setSevenDaysReminders] = useState([]);
  const [isSummaryOn, setIsSummaryOn] = useState(false);
  const [error, setError] = useState(null);

  const { refetch: refetchSevenDaysSummary } = useRQGetRecords(
    "sevenRemindersSummary",
    getSevenRemindersSummaryLink(),
    //isSummaryOn,
    false,
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);

      if (data.data !== undefined) {
        setSevenDaysReminders(data.data);
        setIsSummaryOn(true);
      }
    },
    (err) => setError(err)
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
