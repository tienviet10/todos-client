import React, { createContext, useState } from "react";
import { getLocalStorage } from "../auth/auth";
import { getRequestWithToken } from "../reminders/rest-request";

const SevenDaysSummaryContext = createContext();

function SevenDaysSummaryProvider({ children }) {
  const [isSummaryOn, setIsSummaryOn] = useState(false);
  const [sevenDaysReminders, setSevenDaysReminders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function getSevenDaysReminders() {
    setLoading(true);
    async function execFunction() {
      try {
        //Call token outside return empty when just sign in
        const token = getLocalStorage();
        const response = await getRequestWithToken(
          `/v1/reminders/seven-days-reminders`,
          token
        );
        if (response.status) {
          setSevenDaysReminders(response.data);
          setIsSummaryOn(true);
        } else {
          setError("Error fetching a reminder from notification");
          throw new Error("Fetch request error");
        }
      } catch (error) {
        setError(error);
      }
    }
    execFunction();
    setLoading(false);
  }

  return (
    <SevenDaysSummaryContext.Provider
      value={{
        isSummaryOn,
        setIsSummaryOn,
        sevenDaysReminders,
        getSevenDaysReminders,
        error,
        loading,
      }}
    >
      {children}
    </SevenDaysSummaryContext.Provider>
  );
}

export { SevenDaysSummaryContext, SevenDaysSummaryProvider };
